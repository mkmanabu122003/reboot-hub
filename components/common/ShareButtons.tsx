'use client';

import { SITE_URL } from '@/lib/constants';

interface ShareButtonsProps {
  title: string;
  slug: string;
  category: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, slug, category }) => {
  const url = `${SITE_URL}/${category}/${slug}/`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex items-center gap-3 my-6">
      <span className="text-body-sm text-text-muted">シェア:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 bg-bg-secondary rounded text-body-sm text-text-muted hover:bg-border transition-colors"
      >
        X
      </a>
      <a
        href={`https://b.hatena.ne.jp/entry/${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 bg-bg-secondary rounded text-body-sm text-text-muted hover:bg-border transition-colors"
      >
        はてブ
      </a>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 bg-bg-secondary rounded text-body-sm text-text-muted hover:bg-border transition-colors"
      >
        LINE
      </a>
      <button
        onClick={handleCopy}
        className="px-3 py-1.5 bg-bg-secondary rounded text-body-sm text-text-muted hover:bg-border transition-colors"
      >
        コピー
      </button>
    </div>
  );
};

export default ShareButtons;
