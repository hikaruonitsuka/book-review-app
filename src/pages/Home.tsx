import { Link } from 'react-router-dom';

import { ChevronRight, Pencil } from 'lucide-react';

import ErrorText from '@/components/form/ErrorText';
import HomePagination from '@/features/home/HomePagination';
import { useFetchBooks } from '@/features/home/hooks/useFetchBooks';
import { useSendSelectedBookLog } from '@/features/home/hooks/useSendSelectedBookLog';
import { useAuth } from '@/hooks/useAuth';
import { Book } from '@/types/Book';

const Home = () => {
  const { isLogin } = useAuth();
  const {
    currentPageData: books,
    error,
    isLoading,
    offset,
    isLastPage,
    isPenultimatePage,
  } = useFetchBooks();

  const sendSelectedBookLog = useSendSelectedBookLog();

  // 本を選択した時にログを記録
  const handleBookSelect = async (bookId: string) => {
    try {
      await sendSelectedBookLog(bookId);
    } catch (error) {
      console.log(error);
    }
  };

  if (error)
    return (
      <div className="home">
        <ErrorText>エラーが発生しました。</ErrorText>
      </div>
    );

  if (isLoading || !books) {
    return (
      <div className="home">
        <div>Loading...</div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="home">
        <ErrorText>レビューデータが存在しませんでした。</ErrorText>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="home__bookList">
        {books.map((book: Book) => (
          <article className="home__bookItem" key={book.id}>
            <Link
              onClick={isLogin ? () => handleBookSelect(book.id) : undefined}
              to={`/detail/${book.id}`}
              className="home__bookLink"
            >
              <div className="home__bookGroup">
                <h2 className="home__bookTitle">{book.title}</h2>
                <p className="home__bookDetail">{book.detail}</p>
                <div className="home__bookReviewerGroup">
                  <span>Reviewer:</span>
                  <span className="home__bookReviewer">{book.reviewer}</span>
                </div>
              </div>
              <div className="home__bookLinkArrow">
                <ChevronRight size={16} strokeWidth={2} />
              </div>
            </Link>
            {book.isMine && (
              <Link to={`/edit/${book.id}`} className="home__bookEdit">
                <Pencil size={18} strokeWidth={2} color="#155e75" fill="#fff" />
              </Link>
            )}
          </article>
        ))}
      </div>
      <div className="home__pagination">
        <HomePagination
          offset={offset}
          isLastPage={isLastPage}
          isPenultimatePage={isPenultimatePage}
        />
      </div>
    </div>
  );
};

export default Home;
