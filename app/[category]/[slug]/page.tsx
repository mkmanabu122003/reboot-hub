import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { CATEGORIES, CategorySlug, SITE_NAME, SITE_URL } from '@/lib/constants';
import { getArticles, getArticleBySlug, getRelatedArticles } from '@/lib/articles';
import { getProductBySlug } from '@/lib/products';
import { markdownToHtml } from '@/lib/markdown';
import Breadcrumb from '@/components/layout/Breadcrumb';
import PRBadge from '@/components/article/PRBadge';
import AuthorBox from '@/components/article/AuthorBox';
import ArticleBody from '@/components/article/ArticleBody';
import TOC from '@/components/article/TOC';
import AffiliateCard from '@/components/article/AffiliateCard';
import RelatedArticles from '@/components/article/RelatedArticles';
import ShareButtons from '@/components/common/ShareButtons';
import SchemaOrg from '@/components/seo/SchemaOrg';

interface ArticlePageProps {
  params: { category: string; slug: string };
}

export function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = getArticleBySlug(params.category, params.slug);
  if (!article) return {};

  const url = `${SITE_URL}/${article.category}/${article.slug}/`;

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: 'article',
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}${article.thumbnail}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [`${SITE_URL}${article.thumbnail}`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const categorySlug = params.category as CategorySlug;
  const category = CATEGORIES[categorySlug];

  if (!category) {
    notFound();
  }

  const article = getArticleBySlug(params.category, params.slug);
  if (!article) {
    notFound();
  }

  const htmlContent = await markdownToHtml(article.content);
  const relatedArticles = article.relatedSlugs ? getRelatedArticles(article.relatedSlugs) : [];

  // ProductCTA only for ai-career category
  const product = article.category === 'ai-career' && article.productSlug
    ? getProductBySlug(article.productSlug)
    : null;

  return (
    <div className="max-w-content mx-auto px-4">
      <SchemaOrg type="article" article={article} />
      <Breadcrumb
        items={[
          { label: category.name, href: `/${article.category}/` },
          { label: article.title },
        ]}
      />

      <article className="py-8">
        {/* PR Badge */}
        <PRBadge hasPR={article.hasPR} />

        {/* Title */}
        <h1 className="mt-4">{article.title}</h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mt-4 text-body-sm text-text-muted">
          <time dateTime={article.publishedAt}>公開: {article.publishedAt}</time>
          {article.updatedAt !== article.publishedAt && (
            <time dateTime={article.updatedAt}>更新: {article.updatedAt}</time>
          )}
          <span
            className="px-2 py-0.5 text-xs rounded text-white"
            style={{ backgroundColor: category.color }}
          >
            {category.name}
          </span>
          <span>{article.readingTime}分で読める</span>
        </div>

        {/* Author Compact */}
        <div className="mt-4">
          <AuthorBox variant="compact" />
        </div>

        {/* Hero Image */}
        {fs.existsSync(path.join(process.cwd(), 'public', `/images/articles/${article.slug}.webp`)) && (
          <div className="mt-6 relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={`/images/articles/${article.slug}.webp`}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        )}

        {/* Share */}
        <ShareButtons title={article.title} slug={article.slug} category={article.category} />

        {/* Content + TOC Layout */}
        <div className="flex gap-8 mt-8">
          <div className="flex-1 min-w-0 max-w-article">
            {/* Mobile TOC */}
            <details className="lg:hidden mb-8 bg-bg-secondary p-4 rounded-lg">
              <summary className="font-bold text-text cursor-pointer">目次</summary>
              <div className="mt-3">
                <TOC html={htmlContent} />
              </div>
            </details>

            <ArticleBody content={htmlContent} />
          </div>

          {/* Desktop TOC Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <TOC html={htmlContent} />
            </div>
          </aside>
        </div>

        {/* Affiliate Cards */}
        {article.affiliates && <AffiliateCard affiliates={article.affiliates} />}

        {/* Author Detailed */}
        <div className="my-12">
          <AuthorBox variant="detailed" />
        </div>

        {/* Related Articles */}
        <RelatedArticles articles={relatedArticles} />

        {/* Product CTA (ai-career only) */}
        {product && (
          <div className="my-12 p-6 bg-bg-secondary rounded-lg border-2 border-accent">
            <h3 className="text-accent">この記事のプロンプトをまとめたパッケージ</h3>
            <p className="mt-2 text-text">{product.title}</p>
            <p className="mt-1 text-body-sm text-text-muted">{product.description}</p>
            <p className="mt-2 font-bold text-lg text-text">¥{product.price.toLocaleString()}</p>
            <a
              href={`/products/${product.slug}/`}
              className="inline-block mt-4 px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity font-bold"
            >
              詳細を見る
            </a>
          </div>
        )}
      </article>
    </div>
  );
}
