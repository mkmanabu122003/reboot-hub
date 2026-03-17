import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, basePath }) => {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="ページネーション" className="flex justify-center gap-2 mt-12">
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`}
          className="px-4 py-2 rounded border border-border text-text-muted hover:bg-bg-secondary transition-colors"
        >
          前へ
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={page === 1 ? basePath : `${basePath}?page=${page}`}
          className={`px-4 py-2 rounded transition-colors ${
            page === currentPage
              ? 'bg-primary text-white'
              : 'border border-border text-text-muted hover:bg-bg-secondary'
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-2 rounded border border-border text-text-muted hover:bg-bg-secondary transition-colors"
        >
          次へ
        </Link>
      )}
    </nav>
  );
};

export default Pagination;
