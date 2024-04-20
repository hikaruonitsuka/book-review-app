import Container from '@/components/Container';
import CreateBookReviewForm from '@/features/createBookReview/CreateBookReviewForm';

const CreateBookReviewPage = () => {
  return (
    <div className="grid min-h-full place-items-center">
      <Container size="md">
        <section className="flex w-full flex-col gap-y-14">
          <h2 className="text-center text-2xl font-bold">新規レビュー作成</h2>
          <CreateBookReviewForm />
        </section>
      </Container>
    </div>
  );
};

export default CreateBookReviewPage;
