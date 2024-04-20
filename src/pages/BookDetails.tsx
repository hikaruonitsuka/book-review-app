import Container from '@/components/Container';
import ErrorText from '@/components/form/ErrorText';
import { useFetchBookDetails } from '@/features/bookDetails/hooks/useFetchBookDetails';
import { useAuth } from '@/hooks/useAuth';

const BookDetails = () => {
  const { isLogin } = useAuth();
  const { data, error, isLoading } = useFetchBookDetails();

  if (!isLogin) {
    return (
      <div className="grid h-full place-items-center">
        <p>ログインすると閲覧できます</p>
      </div>
    );
  }

  if (error)
    return (
      <div className="grid h-full place-items-center">
        <ErrorText>エラーが発生しました。</ErrorText>
      </div>
    );

  if (isLoading) {
    return (
      <div className="grid h-full place-items-center">
        <div>Loading...</div>
      </div>
    );
  }

  const { title, url, detail, review, reviewer } = data;

  return (
    <Container>
      <section className="flex flex-col gap-y-4">
        <div className="flex flex-col">
          <span className="text-sm font-bold">書籍タイトル</span>
          <h2 className="border-b-2 border-gray-200 text-3xl font-bold">
            {title}
          </h2>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold">書籍へのURL</span>
          <span>{url}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold">書籍詳細</span>
          <p>{detail}</p>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold">レビュー内容</span>
          <p>{review}</p>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold">レビュー投稿者</span>
          <p>{reviewer}</p>
        </div>
      </section>
    </Container>
  );
};

export default BookDetails;
