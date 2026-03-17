import type { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'AI業務自動化ツール',
  description: 'コンサル実務で使えるAI業務自動化ツール・テンプレート・講座の一覧。',
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="max-w-content mx-auto px-4">
      <Breadcrumb items={[{ label: '商品一覧' }]} />

      <section className="py-8">
        <h1>AI業務自動化ツール</h1>
        <p className="mt-2 text-text-muted">コンサル実務で使えるAI業務自動化ツール・テンプレート・講座</p>
      </section>

      {products.length === 0 ? (
        <p className="text-text-muted py-8">商品はまだありません。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
