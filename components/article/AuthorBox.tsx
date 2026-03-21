import Image from 'next/image';
import Link from 'next/link';
import { AUTHOR } from '@/lib/constants';

interface AuthorBoxProps {
  variant: 'compact' | 'detailed';
}

const AuthorBox: React.FC<AuthorBoxProps> = ({ variant }) => {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3">
        <Image src={AUTHOR.avatar} alt={AUTHOR.name} width={36} height={36} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
        <div>
          <span className="text-sm font-bold text-text">{AUTHOR.name}</span>
          <span className="text-sm text-text-muted ml-2">{AUTHOR.bioShort}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary rounded-xl p-6 flex flex-col sm:flex-row items-start gap-5">
      <Image src={AUTHOR.avatar} alt={AUTHOR.name} width={72} height={72} className="w-[72px] h-[72px] rounded-full object-cover flex-shrink-0" />
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
        <div className="mt-3">
          <Link
            href="/about/"
            className="text-sm text-secondary hover:text-primary transition-colors"
          >
            プロフィールを見る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthorBox;
