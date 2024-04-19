import { useEffect, useState } from 'react';

import { useCookies } from 'react-cookie';
import { Link, useSearchParams } from 'react-router-dom';

import axios from 'axios';
import { ChevronRight, Pencil } from 'lucide-react';

import Pagination from '@/components/Pagination';
import ErrorText from '@/components/form/ErrorText';
import { API_URL } from '@/config';
import { useFetchBooks } from '@/hooks/useFetchBooks';
import { Book } from '@/types/Book';

const Home = () => {
  // URLクエリパラメータからoffsetを取得
  const [searchParams] = useSearchParams();
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  // tokenを取得
  const [cookies] = useCookies(['token']);
  const token: string | undefined = cookies.token;

  // useFetchBooksカスタムフックからoffsetとtokenを利用してデータを取得
  const {
    currentPageData: books,
    nextPageData,
    nextNextPageData,
    error,
    isLoading,
  } = useFetchBooks({
    url: token ? `${API_URL}/books` : `${API_URL}/public/books`,
    offset: offset,
    token: token,
  });

  // 最終ページと最終ページより1ページ前かどうかの状態を管理
  const [isLastPage, setIsLastPage] = useState(false);
  const [isPenultimatePage, setIsPenultimatePage] = useState(false);

  useEffect(() => {
    if (nextPageData && nextPageData.length === 0) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }

    if (nextNextPageData && nextNextPageData.length === 0) {
      setIsPenultimatePage(true);
    } else {
      setIsPenultimatePage(false);
    }
  }, [nextPageData, nextNextPageData]);

  // 本を選択した時にログを記録
  const handleBookSelect = async (bookId: string) => {
    try {
      await axios.post(
        `${API_URL}/logs`,
        {
          selectBookId: bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
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
              onClick={() => handleBookSelect(book.id)}
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
                <Pencil size={18} strokeWidth={2} color="#0891b2" fill="#fff" />
              </Link>
            )}
          </article>
        ))}
      </div>
      {
        <div className="home__pagination">
          <Pagination
            offset={offset}
            isLastPage={isLastPage}
            isPenultimatePage={isPenultimatePage}
          />
        </div>
      }
    </div>
  );
};

export default Home;
