import Link from 'next/link';
import { SITE_NAME, CATEGORIES } from '@/lib/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-secondary border-t border-border mt-12">
      <div className="max-w-content mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Site Info */}
          <div>
            <Link href="/" className="text-lg font-bold text-primary">
              {SITE_NAME}
            </Link>
            <p className="mt-2 text-body-sm text-text-muted">
              IT12年×Big4経験者が語る、コンサルの先のキャリア戦略
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-body font-bold mb-3">カテゴリ</h3>
            <ul className="flex flex-col gap-2">
              {Object.entries(CATEGORIES).map(([slug, cat]) => (
                <li key={slug}>
                  <Link
                    href={`/${slug}/`}
                    className="text-body-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-body font-bold mb-3">リンク</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/about/" className="text-body-sm text-text-muted hover:text-primary transition-colors">
                  プロフィール
                </Link>
              </li>
              <li>
                <Link href="/products/" className="text-body-sm text-text-muted hover:text-primary transition-colors">
                  商品一覧
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="text-body-sm text-text-muted hover:text-primary transition-colors">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/disclosure/" className="text-body-sm text-text-muted hover:text-primary transition-colors">
                  広告掲載ポリシー
                </Link>
              </li>
              <li>
                <Link href="/privacy/" className="text-body-sm text-text-muted hover:text-primary transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/tokushoho/" className="text-body-sm text-text-muted hover:text-primary transition-colors">
                  特定商取引法に基づく表記
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-body-sm text-text-muted">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
