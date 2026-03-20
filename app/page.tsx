import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, TAGLINE, CATEGORIES, CategorySlug } from '@/lib/constants';
import { getArticles, getArticlesByCategory } from '@/lib/articles';
import ArticleCard from '@/components/article/ArticleCard';
import SchemaOrg from '@/components/seo/SchemaOrg';

export const metadata: Metadata = {
  openGraph: {
    title: `${SITE_NAME} | ${SITE_DESCRIPTION}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: 'website',
    siteName: SITE_NAME,
    images: [{ url: `${SITE_URL}/images/ogp/default.webp` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | ${SITE_DESCRIPTION}`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/images/ogp/default.webp`],
  },
  alternates: { canonical: SITE_URL },
};

export default function Home() {
  const allArticles = getArticles();
  const popularArticles = allArticles.slice(0, 4);

  const categoryEntries = Object.entries(CATEGORIES) as [CategorySlug, typeof CATEGORIES[CategorySlug]][];

  return (
    <div>
      <SchemaOrg type="website" />

      {/* Hero */}
      <section
        className="relative py-16 md:py-24 px-5 text-center bg-cover bg-center max-h-[480px] flex flex-col items-center justify-center"
        style={{ backgroundImage: 'linear-gradient(135deg, rgba(27,79,114,0.75) 0%, rgba(46,117,182,0.6) 100%), url(/images/hero-bg.webp)', backgroundSize: 'cover', backgroundPosition: 'center 40%' }}
      >
        <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
          {SITE_NAME}
        </h1>
        <p className="mt-4 text-base md:text-lg text-white/80">
          理想のキャリアへ、再起動しよう。
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="#popular"
            className="px-6 py-3 bg-white text-primary font-bold rounded-lg text-sm hover:bg-white/90 transition-colors"
          >
            記事を読む
          </Link>
          <Link
            href="/products/"
            className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg text-sm hover:bg-white/10 transition-colors"
          >
            サービス一覧
          </Link>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="max-w-content mx-auto px-5 pt-10">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className="px-4 py-1.5 text-sm font-medium rounded-full bg-primary text-white"
          >
            All
          </Link>
          {categoryEntries.map(([slug, cat]) => (
            <Link
              key={slug}
              href={`/${slug}/`}
              className="px-4 py-1.5 text-sm font-medium rounded-full border border-border text-text-muted hover:border-primary hover:text-primary transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Articles */}
      <section id="popular" className="max-w-content mx-auto px-5 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            人気の記事
          </h2>
          <Link href="/consul-real/" className="text-sm text-secondary hover:text-primary transition-colors">
            すべて見る
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {popularArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="horizontal" />
          ))}
        </div>
      </section>

      {/* Category Latest */}
      <section className="max-w-content mx-auto px-5 pb-16">
        {categoryEntries.map(([slug, cat]) => {
          const articles = getArticlesByCategory(slug).slice(0, 2);
          if (articles.length === 0) return null;
          return (
            <div key={slug} className="mb-12">
              <h2 className="text-lg font-bold mb-5">
                {cat.name}{' '}
                <span className="text-text-muted font-normal text-sm">注目記事</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="compact" />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
