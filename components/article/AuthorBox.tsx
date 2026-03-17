import Link from 'next/link';
import { AUTHOR } from '@/lib/constants';

interface AuthorBoxProps {
  variant: 'compact' | 'detailed';
}

const AuthorBox: React.FC<AuthorBoxProps> = ({ variant }) => {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center text-text-muted text-body-sm">
          {AUTHOR.name[0]}
        </div>
        <div>
          <span className="text-body-sm font-bold text-text">{AUTHOR.name}</span>
          <span className="text-body-sm text-text-muted ml-2">{AUTHOR.bioShort}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-full bg-border flex-shrink-0 flex items-center justify-center text-text-muted text-xl">
          {AUTHOR.name[0]}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-text">{AUTHOR.name}</h4>
          <p className="text-body-sm text-text-muted mt-1">{AUTHOR.bio}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {AUTHOR.credentials.map((cred) => (
              <span key={cred} className="inline-block px-2 py-0.5 text-xs bg-bg rounded border border-border text-text-muted">
                {cred}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <Link href="/about/" className="text-body-sm text-secondary hover:text-primary">
              プロフィールを見る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBox;
