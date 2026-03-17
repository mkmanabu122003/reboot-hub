import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/constants';
import { getArticles } from '@/lib/articles';

export async function GET() {
  const articles = getArticles();

  const items = articles
    .slice(0, 20)
    .map(
      (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${SITE_URL}/${article.category}/${article.slug}/</link>
      <description><![CDATA[${article.description}]]></description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <guid>${SITE_URL}/${article.category}/${article.slug}/</guid>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>ja</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
