import Container from '@/components/Container';
import ErrorText from '@/components/form/ErrorText';
import EditBookForm from '@/features/editBook/EditBookForm';
import { useFetchBookReview } from '@/features/editBook/hooks/useFetchBookReview';

const EditBook = () => {
  const { data: book, error, isLoading } = useFetchBookReview();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorText>エラーが発生しました！</ErrorText>;
  }

  return (
    <div className="grid min-h-full place-items-center">
      <Container size="md">
        <section className="flex w-full flex-col gap-y-14">
          <h2 className="text-center text-2xl font-bold">
            書籍レビューを編集する
          </h2>
          <EditBookForm defaultValues={book} />
        </section>
      </Container>
    </div>
  );
};

export default EditBook;
