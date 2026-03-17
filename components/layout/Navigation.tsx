'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';

interface NavigationProps {
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onClose }) => {
  const pathname = usePathname();

  return (
    <div className="lg:hidden border-t border-border bg-bg">
      <nav className="max-w-content mx-auto px-4 py-4 flex flex-col gap-2">
        {Object.entries(CATEGORIES).map(([slug, cat]) => (
          <Link
            key={slug}
            href={`/${slug}/`}
            onClick={onClose}
            className={`block py-3 px-4 rounded-lg transition-colors ${
              pathname?.startsWith(`/${slug}`)
                ? 'bg-bg-secondary text-primary font-bold'
                : 'text-text hover:bg-bg-secondary'
            }`}
          >
            {cat.name}
          </Link>
        ))}
        <Link
          href="/products/"
          onClick={onClose}
          className={`block py-3 px-4 rounded-lg transition-colors ${
            pathname?.startsWith('/products')
              ? 'bg-bg-secondary text-primary font-bold'
              : 'text-text hover:bg-bg-secondary'
          }`}
        >
          商品
        </Link>
        <Link
          href="/about/"
          onClick={onClose}
          className={`block py-3 px-4 rounded-lg transition-colors ${
            pathname === '/about'
              ? 'bg-bg-secondary text-primary font-bold'
              : 'text-text hover:bg-bg-secondary'
          }`}
        >
          プロフィール
        </Link>
      </nav>
    </div>
  );
};

export default Navigation;
