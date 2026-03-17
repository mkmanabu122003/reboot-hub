import { MetadataRoute } from 'next';
import { SITE_URL, CATEGORIES } from '@/lib/constants';
import { getArticles } from '@/lib/articles';
import { getProducts } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles();
  const products = getProducts();

  const staticPages = [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/about/`, lastModified: new Date() },
    { url: `${SITE_URL}/products/`, lastModified: new Date() },
    { url: `${SITE_URL}/disclosure/`, lastModified: new Date() },
    { url: `${SITE_URL}/privacy/`, lastModified: new Date() },
    { url: `${SITE_URL}/tokushoho/`, lastModified: new Date() },
    { url: `${SITE_URL}/contact/`, lastModified: new Date() },
  ];

  const categoryPages = Object.keys(CATEGORIES).map((category) => ({
    url: `${SITE_URL}/${category}/`,
    lastModified: new Date(),
  }));

  const articlePages = articles.map((article) => ({
    url: `${SITE_URL}/${article.category}/${article.slug}/`,
    lastModified: new Date(article.updatedAt),
  }));

  const productPages = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}/`,
    lastModified: new Date(product.publishedAt),
  }));

  return [...staticPages, ...categoryPages, ...articlePages, ...productPages];
}
