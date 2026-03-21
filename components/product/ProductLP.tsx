import { Product } from '@/lib/types';
import { getRelatedArticles } from '@/lib/articles';
import ArticleCard from '@/components/article/ArticleCard';
import { AUTHOR } from '@/lib/constants';

interface ProductLPProps {
  product: Product;
  htmlContent: string;
}

const ProductLP: React.FC<ProductLPProps> = ({ product, htmlContent }) => {
  const relatedArticles = product.relatedArticles
    ? getRelatedArticles(product.relatedArticles)
    : [];

  return (
    <div>
      {/* Hero */}
      <section className="bg-bg-secondary py-16 px-4 text-center">
        <h1 className="text-accent">{product.title}</h1>
        <p className="mt-4 text-lg text-text-muted">{product.description}</p>
        <p className="mt-4 text-3xl font-bold text-accent">¥{product.price.toLocaleString()}</p>
        <a
          href={product.purchaseUrl}
          target="_blank"
          rel="noopener"
          className="inline-block mt-6 px-8 py-4 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-bold"
        >
          購入する
        </a>
      </section>

      {/* Features */}
      <section className="max-w-article mx-auto px-4 py-12">
        <h2 className="mb-6">収録内容</h2>
        <ul className="space-y-3">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="text-success mt-1">&#10003;</span>
              <span className="text-text">{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Body */}
      <section className="max-w-article mx-auto px-4 py-8">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </section>

      {/* Author Authority */}
      <section className="max-w-article mx-auto px-4 py-8">
        <div className="bg-bg-secondary rounded-lg p-6">
          <h3 className="mb-3">著者について</h3>
          <p className="text-text">{AUTHOR.bio}</p>
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-12 px-4 text-center">
        <a
          href={product.purchaseUrl}
          target="_blank"
          rel="noopener"
          className="inline-block px-8 py-4 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-bold"
        >
          購入する（¥{product.price.toLocaleString()}）
        </a>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="max-w-content mx-auto px-4 py-12">
          <h2 className="mb-6">関連ブログ記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductLP;
