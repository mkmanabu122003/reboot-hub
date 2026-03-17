import { Product } from '@/lib/types';

interface ProductCTAProps {
  product: Product;
}

const ProductCTA: React.FC<ProductCTAProps> = ({ product }) => {
  return (
    <div className="my-12 p-6 bg-bg-secondary rounded-lg border-2 border-accent">
      <h3 className="text-accent">この記事のプロンプトをまとめたパッケージ</h3>
      <p className="mt-2 font-bold text-text">{product.title}</p>
      <p className="mt-1 text-body-sm text-text-muted">{product.description}</p>
      <p className="mt-2 text-lg font-bold text-accent">¥{product.price.toLocaleString()}</p>
      <a
        href={`/products/${product.slug}/`}
        className="inline-block mt-4 px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity font-bold"
      >
        詳細を見る
      </a>
    </div>
  );
};

export default ProductCTA;
