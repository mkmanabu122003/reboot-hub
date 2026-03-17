import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-content mx-auto px-4 py-20 text-center">
      <h1 className="text-primary">404</h1>
      <p className="mt-4 text-text-muted text-lg">
        お探しのページが見つかりませんでした。
      </p>
      <Link
        href="/"
        className="inline-block mt-8 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        トップページに戻る
      </Link>
    </div>
  );
}
