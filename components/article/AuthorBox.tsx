import Link from 'next/link';
import { AUTHOR } from '@/lib/constants';

interface AuthorBoxProps {
  variant: 'compact' | 'detailed';
}

const AuthorBox: React.FC<AuthorBoxProps> = ({ variant }) => {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {AUTHOR.name[0]}
        </div>
        <div>
          <span className="text-sm font-bold text-text">{AUTHOR.name}</span>
          <span className="text-sm text-text-muted ml-2">{AUTHOR.bioShort}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary rounded-xl p-6 flex flex-col sm:flex-row items-start gap-5">
      <div className="w-[72px] h-[72px] rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold">
        {AUTHOR.name[0]}
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h4 className="text-[16px] font-bold text-text">{AUTHOR.name}</h4>
          {AUTHOR.credentials.map((cred) => (
            <span
              key={cred}
              className="inline-block px-2.5 py-0.5 text-[11px] bg-secondary/10 text-secondary rounded-full font-medium"
            >
              {cred}
            </span>
          ))}
        </div>
        <p className="text-sm text-text-muted leading-[1.7]">{AUTHOR.bio}</p>
        <div className="flex items-center gap-3 mt-3">
          {AUTHOR.social.twitter && (
            <a
              href={AUTHOR.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          )}
          {AUTHOR.social.note && (
            <a
              href={AUTHOR.social.note}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-colors"
              aria-label="Note"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </a>
          )}
          <Link
            href="/about/"
            className="text-sm text-secondary hover:text-primary transition-colors ml-1"
          >
            プロフィールを見る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthorBox;
