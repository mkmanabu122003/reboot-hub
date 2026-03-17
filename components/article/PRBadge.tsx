interface PRBadgeProps {
  hasPR: boolean;
}

const PRBadge: React.FC<PRBadgeProps> = ({ hasPR }) => {
  if (!hasPR) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-secondary rounded text-body-sm text-text-muted">
      <span className="font-bold text-xs bg-border px-1.5 py-0.5 rounded">PR</span>
      <span>本記事にはアフィリエイトリンクが含まれています</span>
    </div>
  );
};

export default PRBadge;
