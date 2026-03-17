import Link from 'next/link';
import { SITE_NAME, CATEGORIES } from '@/lib/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary mt-16">
      <div className="max-w-content mx-auto px-5 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Site Info */}
          <div>
            <Link href="/" className="text-lg font-extrabold text-white flex items-center gap-2">
              {SITE_NAME}
            </Link>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              理想のキャリアへの第一歩をサポートするメディアです。最新の転職市場、スキルアップ情報、フリーランスの働き方をお届けします。
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://twitter.com/xxxxx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://note.com/xxxxx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Note"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </a>
            </div>
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

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">Newsletter</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              最新の記事や限定キャンペーン情報をお届けします。
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <input
                type="email"
                placeholder="メールアドレス"
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50"
              />
              <button className="px-4 py-2 rounded-lg border border-white/40 text-sm text-white font-medium hover:bg-white/10 transition-colors">
                登録する
              </button>
            </div>
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
