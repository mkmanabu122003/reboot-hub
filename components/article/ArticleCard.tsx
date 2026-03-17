import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { Article } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';

const CATEGORY_GRADIENTS: Record<string, string> = {
  'consul-real': 'from-[#1B4F72] to-[#2E75B6]',
  'career-change': 'from-[#2E75B6] to-[#5DADE2]',
  'freelance': 'from-[#27AE60] to-[#58D68D]',
  'ai-career': 'from-[#8E44AD] to-[#BB8FCE]',
  'global': 'from-[#E67E22] to-[#F5B041]',
};

interface ArticleCardProps {
  article: Article;
  variant?: 'vertical' | 'horizontal' | 'compact';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'vertical' }) => {
  const category = CATEGORIES[article.category];
  const gradient = CATEGORY_GRADIENTS[article.category] || 'from-gray-600 to-gray-400';

  const thumbnailPath = `/images/articles/${article.slug}.webp`;
  const thumbnailExists = fs.existsSync(
    path.join(process.cwd(), 'public', thumbnailPath)
  );

  // Compact horizontal variant (for category sections)
  if (variant === 'compact') {
    return (
      <Link
        href={`/${article.category}/${article.slug}/`}
        className="group flex items-start gap-4 bg-bg rounded-xl border border-border p-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
      >
        <div className="w-[80px] h-[80px] relative overflow-hidden rounded-lg flex-shrink-0">
          {thumbnailExists ? (
            <Image
              src={thumbnailPath}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="80px"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[14px] font-bold leading-[1.5] text-text group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <time dateTime={article.publishedAt} className="block mt-2 text-[12px] text-[#9CA3AF]">
            {article.publishedAt}
          </time>
        </div>
      </Link>
    );
  }

  // Horizontal variant (for popular articles)
  if (variant === 'horizontal') {
    return (
      <Link
        href={`/${article.category}/${article.slug}/`}
        className="group flex items-start gap-5 bg-bg rounded-xl border border-border overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
      >
        <div className="w-[180px] md:w-[200px] aspect-[4/3] relative overflow-hidden flex-shrink-0">
          {thumbnailExists ? (
            <>
              <Image
                src={thumbnailPath}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="200px"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-200" />
            </>
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center p-3`}
            >
              <p className="text-white text-xs font-bold text-center leading-relaxed line-clamp-2">
                {article.title}
              </p>
            </div>
          )}
          <span
            className="absolute top-0 left-0 text-[10px] text-white px-2 py-0.5 rounded-br-lg font-medium"
            style={{ backgroundColor: category.color }}
          >
            {category.name}
          </span>
        </div>
        <div className="flex-1 min-w-0 py-4 pr-4">
          <h3 className="text-[15px] font-bold leading-[1.5] text-text group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-2 text-[13px] text-text-muted leading-relaxed line-clamp-2">
            {article.description}
          </p>
          <div className="mt-3 flex items-center gap-3 text-[12px] text-[#9CA3AF]">
            <span className="inline-flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={article.publishedAt}>{article.publishedAt}</time>
            </span>
            <span className="inline-flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readingTime} min read
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Default vertical variant
  return (
    <Link
      href={`/${article.category}/${article.slug}/`}
      className="group block bg-bg rounded-xl border border-border overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200"
    >
      <div className="aspect-video relative overflow-hidden rounded-t-xl">
        {thumbnailExists ? (
          <>
            <Image
              src={thumbnailPath}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-200" />
          </>
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center p-6`}
          >
            <p className="text-white text-sm font-bold text-center leading-relaxed line-clamp-3">
              {article.title}
            </p>
          </div>
        )}
        <span
          className="absolute top-0 left-0 text-[11px] text-white px-2.5 py-1 rounded-br-lg font-medium"
          style={{ backgroundColor: category.color }}
        >
          {category.name}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-[16px] font-bold leading-[1.5] text-text group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <div className="mt-3 flex items-center gap-3 text-[13px] text-[#9CA3AF]">
          <time dateTime={article.publishedAt}>{article.publishedAt}</time>
          <span>{article.readingTime}分で読める</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
