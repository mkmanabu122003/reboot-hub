import { MetadataRoute } from 'next';
import { SITE_URL, CATEGORIES } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  const categories = Object.keys(CATEGORIES);
  const sitemaps = [
    `${SITE_URL}/sitemap/static.xml`,
    ...categories.map((cat) => `${SITE_URL}/sitemap/${cat}.xml`),
    `${SITE_URL}/sitemap/products.xml`,
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/_next/',
          '/api/',
          '/site.webmanifest',
          '/*.json$',
        ],
      },
    ],
    sitemap: sitemaps,
  };
}
