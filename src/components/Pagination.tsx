interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function pageHref(page: number): string {
  return page === 1 ? '/bai-viet' : `/bai-viet/trang/${page}`;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Phân trang bài viết" className="pagination">
      {currentPage > 1 && (
        <a href={pageHref(currentPage - 1)} className="pagination__arrow" aria-label="Trang trước">
          ←
        </a>
      )}
      {pages.map((page) =>
        page === currentPage ? (
          <span key={page} className="pagination__page pagination__page--current" aria-current="page">
            {page}
          </span>
        ) : (
          <a key={page} href={pageHref(page)} className="pagination__page">
            {page}
          </a>
        ),
      )}
      {currentPage < totalPages && (
        <a href={pageHref(currentPage + 1)} className="pagination__arrow" aria-label="Trang sau">
          →
        </a>
      )}
    </nav>
  );
}
