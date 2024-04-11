import { Link } from 'react-router-dom';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  offset: number;
  isPenultimatePage: boolean;
  isLastPage: boolean;
};

const Pagination = ({ offset, isPenultimatePage, isLastPage }: Props) => {
  const currentPage = offset + 1;
  const prevPageOffset = offset - 1;
  const nextPageOffset = offset + 1;

  const pageNumbers = [];

  if (currentPage <= 2) {
    for (let i = 1; i <= 5; i++) {
      pageNumbers.push(i);
    }
  } else {
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      pageNumbers.push(i);
    }
  }

  const filteredPageNumbers = pageNumbers.filter(
    (pageNumber) => pageNumber > 0,
  );

  // 最後のページまたはその前のページである場合、ページ番号リストを調整
  if (isPenultimatePage) {
    if (filteredPageNumbers.includes(currentPage + 2)) {
      filteredPageNumbers.pop(); // 最後の要素（2ページ先）を削除
    }
  }
  if (isLastPage) {
    if (filteredPageNumbers.includes(currentPage + 1)) {
      filteredPageNumbers.pop(); // 最後の要素（1ページ先）を削除
    }
  }

  return (
    <ul className="flex items-center gap-x-8">
      {prevPageOffset >= 0 && (
        <li>
          <Link
            className="grid aspect-square w-10 place-items-center"
            to={`/books?offset=${prevPageOffset}`}
          >
            <ChevronLeft size={16} strokeWidth={2} />
          </Link>
        </li>
      )}
      {filteredPageNumbers.map((pageNumber) => (
        <li key={pageNumber}>
          {pageNumber === currentPage ? (
            <span className="grid aspect-square w-10 place-items-center rounded-full bg-gray-100">
              {pageNumber}
            </span>
          ) : (
            <Link
              className="grid aspect-square w-10 place-items-center"
              to={`/books?offset=${pageNumber - 1}`}
            >
              {pageNumber}
            </Link>
          )}
        </li>
      ))}
      {!isLastPage && (
        <li>
          <Link
            className="grid aspect-square w-10 place-items-center"
            to={`/books?offset=${nextPageOffset}`}
          >
            <ChevronRight size={16} strokeWidth={2} />
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
