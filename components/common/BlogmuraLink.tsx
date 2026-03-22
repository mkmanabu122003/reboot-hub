type Props = {
  className?: string;
};

const BLOGMURA_URL = process.env.NEXT_PUBLIC_BLOGMURA_URL || '';

export default function BlogmuraLink({ className }: Props) {
  if (!BLOGMURA_URL) return null;

  return (
    <div className={`text-center py-4 ${className || ''}`}>
      <p className="text-sm text-text-muted">
        この記事が参考になったら応援お願いします
      </p>
      <a
        href={BLOGMURA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-1 text-sm text-accent hover:text-accent/80
                   underline underline-offset-2 decoration-dotted
                   transition-colors duration-200"
      >
        にほんブログ村 転職キャリアブログへ
      </a>
    </div>
  );
}
