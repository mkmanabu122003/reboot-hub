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
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const category = CATEGORIES[article.category];
  const gradient = CATEGORY_GRADIENTS[article.category] || 'from-gray-600 to-gray-400';

  const thumbnailPath = `/images/articles/${article.slug}.webp`;
  const thumbnailExists = fs.existsSync(
    path.join(process.cwd(), 'public', thumbnailPath)
  );

  return (
    <Link
      href={`/${article.category}/${article.slug}/`}
      className="group block bg-bg rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video relative overflow-hidden">
        {thumbnailExists ? (
          <Image
            src={thumbnailPath}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center p-6`}
          >
            <p className="text-white text-sm font-bold text-center leading-relaxed line-clamp-3">
              {article.title}
            </p>
          </div>
        )}
      </div>
      <div className="p-4">
        <span
          className="inline-block px-2 py-0.5 text-xs rounded text-white mb-2"
          style={{ backgroundColor: category.color }}
        >
          {category.name}
        </span>
        <h3 className="text-body font-bold text-text group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <div className="mt-2 flex items-center gap-3 text-body-sm text-text-muted">
          <time dateTime={article.publishedAt}>{article.publishedAt}</time>
          <span>{article.readingTime}分で読める</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
