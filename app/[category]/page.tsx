import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CATEGORIES, CategorySlug, SITE_NAME } from '@/lib/constants';
import { getArticlesByCategory } from '@/lib/articles';
import ArticleCard from '@/components/article/ArticleCard';
import Breadcrumb from '@/components/layout/Breadcrumb';

interface CategoryPageProps {
  params: { category: string };
}

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = CATEGORIES[params.category as CategorySlug];
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category as CategorySlug;
  const category = CATEGORIES[categorySlug];

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(categorySlug);

  return (
    <div className="max-w-content mx-auto px-4">
      <Breadcrumb items={[{ label: category.name }]} />

      <section className="py-8">
        <h1 style={{ color: category.color }}>{category.name}</h1>
        <p className="mt-2 text-text-muted">{category.description}</p>
      </section>

      {articles.length === 0 ? (
        <p className="text-text-muted py-8">まだ記事がありません。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
