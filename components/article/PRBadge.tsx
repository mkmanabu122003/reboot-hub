import Link from 'next/link';

interface PRBadgeProps {
  hasPR: boolean;
}

const PRBadge: React.FC<PRBadgeProps> = ({ hasPR }) => {
  if (!hasPR) return null;

  return (
    <div className="text-xs text-[#9CA3AF] mb-2">
      <Link href="/disclosure/" className="text-[#9CA3AF] underline hover:text-text-muted transition-colors">
        PR
      </Link>
      <span className="ml-1">本記事にはアフィリエイトリンクが含まれています</span>
    </div>
  );
};

export default PRBadge;
