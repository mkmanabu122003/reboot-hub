import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import sharp from 'sharp';
import { GeminiKeyRotator } from './lib/gemini-client';
import { generateImagePrompt } from './lib/prompt-generator';

const CONTENT_DIR = path.join(process.cwd(), 'content/articles');
const OUTPUT_DIR = path.join(process.cwd(), 'public/images/articles');

interface ArticleInfo {
  slug: string;
  category: string;
  title: string;
  tags: string[];
  outputPath: string;
}

function getAllArticles(): ArticleInfo[] {
  const articles: ArticleInfo[] = [];
  const categories = fs.readdirSync(CONTENT_DIR).filter((d) =>
    fs.statSync(path.join(CONTENT_DIR, d)).isDirectory()
  );

  for (const category of categories) {
    const categoryDir = path.join(CONTENT_DIR, category);
    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.md'));

    for (const file of files) {
      const slug = file.replace(/\.md$/, '');
      const filePath = path.join(categoryDir, file);
      const { data } = matter(fs.readFileSync(filePath, 'utf-8'));

      articles.push({
        slug,
        category,
        title: data.title || slug,
        tags: data.tags || [],
        outputPath: path.join(OUTPUT_DIR, `${slug}.webp`),
      });
    }
  }

  return articles;
}

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    slug: args.includes('--slug')
      ? args[args.indexOf('--slug') + 1]
      : undefined,
    all: args.includes('--all'),
    dryRun: args.includes('--dry-run'),
    force: args.includes('--force'),
  };
}

async function processArticle(
  article: ArticleInfo,
  rotator: GeminiKeyRotator,
  dryRun: boolean
): Promise<void> {
  const prompt = generateImagePrompt({
    title: article.title,
    category: article.category,
    tags: article.tags,
    slug: article.slug,
  });

  console.log(`\n--- ${article.slug} ---`);
  console.log(`Category: ${article.category}`);
  console.log(`Prompt: ${prompt}`);

  if (dryRun) {
    console.log('[DRY RUN] Skipping image generation');
    return;
  }

  console.log('Generating image...');
  const imageBuffer = await rotator.generateImage(prompt);

  await sharp(imageBuffer)
    .resize(1200, 675, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(article.outputPath);

  console.log(`Saved: ${article.outputPath}`);
}

async function main() {
  const opts = parseArgs();

  if (!opts.slug && !opts.all) {
    console.error('Usage:');
    console.error('  npm run generate-images -- --slug <slug>');
    console.error('  npm run generate-images -- --all');
    console.error('  npm run generate-images -- --all --dry-run');
    console.error('  npm run generate-images -- --slug <slug> --force');
    process.exit(1);
  }

  const allArticles = getAllArticles();
  let targets: ArticleInfo[];

  if (opts.slug) {
    const found = allArticles.find((a) => a.slug === opts.slug);
    if (!found) {
      console.error(`Article not found: ${opts.slug}`);
      console.error(
        'Available:',
        allArticles.map((a) => a.slug).join(', ')
      );
      process.exit(1);
    }
    targets = [found];
  } else {
    targets = allArticles;
  }

  if (!opts.force) {
    targets = targets.filter((a) => !fs.existsSync(a.outputPath));
  }

  if (targets.length === 0) {
    console.log('No articles need image generation.');
    if (!opts.force) {
      console.log('Use --force to regenerate existing images.');
    }
    return;
  }

  console.log(`Target articles: ${targets.length}`);

  if (!opts.dryRun) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const rotator = opts.dryRun ? (null as unknown as GeminiKeyRotator) : new GeminiKeyRotator();

  for (let i = 0; i < targets.length; i++) {
    await processArticle(targets[i], rotator, opts.dryRun);

    if (!opts.dryRun && i < targets.length - 1) {
      console.log('Waiting 2s before next request...');
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  console.log('\nDone!');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
