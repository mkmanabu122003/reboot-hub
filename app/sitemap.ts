import { MetadataRoute } from 'next';
import { SITE_URL, CATEGORIES } from '@/lib/constants';
import { getArticles } from '@/lib/articles';
import { getProducts } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles();
  const products = getProducts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/about/`, lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/products/`, lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/disclosure/`, lastModified: new Date('2026-03-01'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy/`, lastModified: new Date('2026-03-01'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/tokushoho/`, lastModified: new Date('2026-03-01'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/contact/`, lastModified: new Date('2026-03-01'), changeFrequency: 'yearly', priority: 0.4 },
  ];

  const categoryPages: MetadataRoute.Sitemap = Object.keys(CATEGORIES).map((category) => ({
    url: `${SITE_URL}/${category}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/${article.category}/${article.slug}/`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}/`,
    lastModified: new Date(product.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...articlePages, ...productPages];
}
