import Link from 'next/link';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-bg rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-bg-secondary flex items-center justify-center text-text-muted text-body-sm">
        {product.title}
      </div>
      <div className="p-4">
        <span className="inline-block px-2 py-0.5 text-xs rounded bg-accent text-white mb-2">
          {product.category}
        </span>
        <h3 className="text-body font-bold text-text">{product.title}</h3>
        <p className="mt-1 text-body-sm text-text-muted line-clamp-2">{product.description}</p>
        <p className="mt-2 text-lg font-bold text-accent">¥{product.price.toLocaleString()}</p>
        <Link
          href={`/products/${product.slug}/`}
          className="inline-block mt-3 px-4 py-2 bg-accent text-white rounded hover:opacity-90 transition-opacity text-body-sm font-bold"
        >
          詳細を見る
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
