import { Article } from '@/lib/types';
import ArticleCard from './ArticleCard';

interface RelatedArticlesProps {
  articles: Article[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles }) => {
  if (articles.length === 0) return null;

  return (
    <div className="my-12">
      <h3 className="mb-6">関連記事</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
