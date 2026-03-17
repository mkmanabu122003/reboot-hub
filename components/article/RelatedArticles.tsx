import Link from 'next/link';
import { Article } from '@/lib/types';
import { getArticles, getArticlesByCategory } from '@/lib/articles';
import ArticleCard from './ArticleCard';

interface RelatedArticlesProps {
  articles: Article[];
  currentSlug?: string;
  currentCategory?: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  articles,
  currentSlug,
  currentCategory,
}) => {
  let displayArticles = articles.filter((a) => a.slug !== currentSlug).slice(0, 3);

  if (displayArticles.length === 0 && currentCategory) {
    displayArticles = getArticlesByCategory(currentCategory)
      .filter((a) => a.slug !== currentSlug)
      .slice(0, 3);
  }

  if (displayArticles.length === 0) {
    displayArticles = getArticles()
      .filter((a) => a.slug !== currentSlug)
      .slice(0, 3);
  }

  if (displayArticles.length === 0) {
    return (
      <div className="my-12 text-center">
        <Link href="/" className="text-secondary hover:text-primary underline">
          他の記事を探す
        </Link>
      </div>
    );
  }

  return (
    <div className="my-12">
      <h3 className="mb-6">関連記事</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
