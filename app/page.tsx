import { SITE_NAME, TAGLINE, CATEGORIES, CategorySlug } from '@/lib/constants';
import { getArticles, getArticlesByCategory } from '@/lib/articles';
import ArticleCard from '@/components/article/ArticleCard';
import SchemaOrg from '@/components/seo/SchemaOrg';

export default function Home() {
  const allArticles = getArticles();
  const popularArticles = allArticles.slice(0, 4);

  const categoryEntries = Object.entries(CATEGORIES) as [CategorySlug, typeof CATEGORIES[CategorySlug]][];

  return (
    <div>
      <SchemaOrg type="website" />
      {/* Hero */}
      <section className="bg-bg-secondary py-16 md:py-24 px-4 text-center">
        <h1 className="text-primary">{SITE_NAME}</h1>
        <p className="mt-4 text-lg text-text-muted">{TAGLINE}</p>
      </section>

      {/* Popular Articles */}
      <section className="max-w-content mx-auto px-4 py-12">
        <h2 className="mb-8">人気の記事</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Category Latest */}
      <section className="max-w-content mx-auto px-4 py-12">
        <h2 className="mb-8">カテゴリ別 新着記事</h2>
        {categoryEntries.map(([slug, cat]) => {
          const articles = getArticlesByCategory(slug).slice(0, 2);
          if (articles.length === 0) return null;
          return (
            <div key={slug} className="mb-10">
              <h3
                className="mb-4 pb-2 border-b-2"
                style={{ borderColor: cat.color }}
              >
                {cat.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
