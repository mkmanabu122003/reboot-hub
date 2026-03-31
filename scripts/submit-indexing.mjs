#!/usr/bin/env node

/**
 * Google Indexing API + IndexNow + Sitemap Ping
 * Usage:
 *   node scripts/submit-indexing.mjs                    # Submit all article URLs from sitemap
 *   node scripts/submit-indexing.mjs --urls URL1 URL2   # Submit specific URLs
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://reboot-hub.jp';
const SERVICE_ACCOUNT_PATH = path.join(PROJECT_ROOT, 'service-account.json');

// ─── CI/CD Support: Generate service-account.json from env var ───
if (!fs.existsSync(SERVICE_ACCOUNT_PATH) && process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
  fs.writeFileSync(SERVICE_ACCOUNT_PATH, process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  console.log('  ℹ️  Generated service-account.json from GOOGLE_SERVICE_ACCOUNT_JSON env var');
}

// ─── URL Collection ───

function getUrlsFromSitemap() {
  const sitemapPath = path.join(PROJECT_ROOT, 'out', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('sitemap.xml not found. Run `npm run build` first.');
    process.exit(1);
  }
  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  return urls;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const urlsIdx = args.indexOf('--urls');
  if (urlsIdx !== -1) {
    return args.slice(urlsIdx + 1).filter((a) => a.startsWith('http'));
  }
  return null;
}

// ─── Google Indexing API ───

async function submitGoogleIndexingApi(urls) {
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.warn('⚠️  service-account.json not found. Skipping Google Indexing API.');
    return { success: 0, failed: 0, skipped: true };
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_PATH,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  const client = await auth.getClient();
  const indexing = google.indexing({ version: 'v3', auth: client });

  let success = 0;
  let failed = 0;

  for (const url of urls) {
    try {
      await indexing.urlNotifications.publish({
        requestBody: {
          url,
          type: 'URL_UPDATED',
        },
      });
      console.log(`  ✅ Google Indexing: ${url}`);
      success++;
    } catch (err) {
      console.error(`  ❌ Google Indexing: ${url} — ${err.message}`);
      failed++;
    }
    // Rate limiting: max 100 requests per day, space them out
    await new Promise((r) => setTimeout(r, 200));
  }

  return { success, failed, skipped: false };
}

// ─── IndexNow (Bing, Yandex, etc.) ───

async function submitIndexNow(urls) {
  // IndexNow requires an API key file at /{key}.txt
  // For simplicity, we use the site URL as host and submit to Bing
  const key = 'reboot-hub-indexnow-key';
  const endpoint = 'https://api.indexnow.org/indexnow';

  try {
    const body = JSON.stringify({
      host: 'reboot-hub.jp',
      key,
      keyLocation: `${SITE_URL}/${key}.txt`,
      urlList: urls,
    });

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    if (res.ok || res.status === 202) {
      console.log(`  ✅ IndexNow: ${urls.length} URLs submitted (status: ${res.status})`);
      return { success: urls.length, failed: 0 };
    } else {
      const text = await res.text();
      console.error(`  ❌ IndexNow: status ${res.status} — ${text}`);
      return { success: 0, failed: urls.length };
    }
  } catch (err) {
    console.error(`  ❌ IndexNow: ${err.message}`);
    return { success: 0, failed: urls.length };
  }
}

// ─── Sitemap Ping ───

async function pingSitemaps() {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`;
  const endpoints = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  ];

  const results = [];
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint);
      const name = endpoint.includes('google') ? 'Google' : 'Bing';
      if (res.ok) {
        console.log(`  ✅ Sitemap ping: ${name} (${res.status})`);
        results.push({ name, success: true });
      } else {
        console.warn(`  ⚠️  Sitemap ping: ${name} (${res.status})`);
        results.push({ name, success: false });
      }
    } catch (err) {
      console.error(`  ❌ Sitemap ping failed: ${err.message}`);
      results.push({ name: endpoint, success: false });
    }
  }
  return results;
}

// ─── Main ───

async function main() {
  console.log('🔍 Reboot Hub — Index Submission\n');

  // Collect URLs
  const specificUrls = parseArgs();
  const urls = specificUrls || getUrlsFromSitemap();

  console.log(`📋 URLs to submit: ${urls.length}`);
  urls.forEach((u) => console.log(`   ${u}`));
  console.log('');

  // 1. Google Indexing API
  console.log('1️⃣  Google Indexing API');
  const googleResult = await submitGoogleIndexingApi(urls);
  console.log('');

  // 2. IndexNow
  console.log('2️⃣  IndexNow (Bing, Yandex, etc.)');
  const indexNowResult = await submitIndexNow(urls);
  console.log('');

  // 3. Sitemap Ping
  console.log('3️⃣  Sitemap Ping');
  const sitemapResults = await pingSitemaps();
  console.log('');

  // Report
  console.log('═══════════════════════════════════════');
  console.log('📊 Results Summary');
  console.log('═══════════════════════════════════════');
  if (googleResult.skipped) {
    console.log(`Google Indexing API: SKIPPED (no service-account.json)`);
  } else {
    console.log(`Google Indexing API: ${googleResult.success} success, ${googleResult.failed} failed`);
  }
  console.log(`IndexNow:           ${indexNowResult.success} success, ${indexNowResult.failed} failed`);
  sitemapResults.forEach((r) => {
    console.log(`Sitemap Ping (${r.name}): ${r.success ? 'OK' : 'FAILED'}`);
  });
  console.log('═══════════════════════════════════════');
}

main().catch(console.error);
