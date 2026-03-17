import Link from 'next/link';
import { Article } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const category = CATEGORIES[article.category];

  return (
    <Link
      href={`/${article.category}/${article.slug}/`}
      className="group block bg-bg rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video bg-bg-secondary relative">
        <div className="absolute inset-0 flex items-center justify-center text-text-muted text-body-sm">
          {article.title}
        </div>
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
