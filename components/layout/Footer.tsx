import Link from 'next/link';
import { SITE_NAME, CATEGORIES } from '@/lib/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary mt-16">
      <div className="max-w-content mx-auto px-5 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Site Info */}
          <div>
            <Link href="/" className="text-lg font-extrabold text-white flex items-center gap-2">
              {SITE_NAME}
            </Link>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              理想のキャリアへの第一歩をサポートするメディアです。最新の転職市場、スキルアップ情報、フリーランスの働き方をお届けします。
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">Category</h3>
            <ul className="flex flex-col gap-2.5">
              {Object.entries(CATEGORIES).map(([slug, cat]) => (
                <li key={slug}>
                  <Link
                    href={`/${slug}/`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">Support</h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/about/" className="text-sm text-white/60 hover:text-white transition-colors">
                  プロフィール
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="text-sm text-white/60 hover:text-white transition-colors">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/disclosure/" className="text-sm text-white/60 hover:text-white transition-colors">
                  広告掲載ポリシー
                </Link>
              </li>
              <li>
                <Link href="/privacy/" className="text-sm text-white/60 hover:text-white transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/tokushoho/" className="text-sm text-white/60 hover:text-white transition-colors">
                  特定商取引法に基づく表記
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
