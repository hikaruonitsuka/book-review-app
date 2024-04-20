import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/Button';
import Container from '@/components/Container';
import ErrorText from '@/components/form/ErrorText';
import FormContainer from '@/components/form/FormContainer';
import FormItem from '@/components/form/FormItem';
import FormItemList from '@/components/form/FormItemList';
import FormLabel from '@/components/form/FormLabel';
import { useEditBookReview } from '@/features/editBook/hooks/useEditBookReview';
import { BookReviewType, BookReview } from '@/utils/validation';

const EditBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookReviewType>({
    resolver: zodResolver(BookReview),
  });

  const { editReview, error } = useEditBookReview();

  return (
    <div className="grid min-h-full place-items-center">
      <Container size="md">
        <section className="flex w-full flex-col gap-y-14">
          <h2 className="text-center text-2xl font-bold">
            書籍レビューを編集する
          </h2>
          <div className="flex flex-col gap-y-4">
            {error && <ErrorText>{error}</ErrorText>}
            <FormContainer onSubmit={handleSubmit((data) => editReview(data))}>
              <FormItemList>
                <FormItem>
                  <FormLabel htmlFor="title">書籍タイトル</FormLabel>
                  <div className="flex w-full flex-col gap-y-1">
                    <input
                      className="w-full rounded border px-2 py-1"
                      type="text"
                      id="title"
                      {...register('title')}
                    />
                    {errors.title?.message && (
                      <ErrorText>{errors.title?.message}</ErrorText>
                    )}
                  </div>
                </FormItem>
                <FormItem>
                  <FormLabel htmlFor="url">書籍へのURL</FormLabel>
                  <div className="flex w-full flex-col gap-y-1">
                    <input
                      className="w-full rounded border px-2 py-1"
                      type="text"
                      id="url"
                      {...register('url')}
                    />
                    {errors.url?.message && (
                      <ErrorText>{errors.url?.message}</ErrorText>
                    )}
                  </div>
                </FormItem>
                <FormItem>
                  <FormLabel htmlFor="detail">書籍詳細</FormLabel>
                  <div className="flex w-full flex-col gap-y-1">
                    <textarea
                      className="w-full rounded border px-2 py-1"
                      id="detail"
                      {...register('detail')}
                    />
                    {errors.detail?.message && (
                      <ErrorText>{errors.detail?.message}</ErrorText>
                    )}
                  </div>
                </FormItem>
                <FormItem>
                  <FormLabel htmlFor="review">レビュー内容</FormLabel>
                  <div className="flex w-full flex-col gap-y-1">
                    <textarea
                      className="min-h-60 w-full rounded border px-2 py-1"
                      id="review"
                      {...register('review')}
                    />
                    {errors.review?.message && (
                      <ErrorText>{errors.review?.message}</ErrorText>
                    )}
                  </div>
                </FormItem>
              </FormItemList>
              <Button>レビューを編集</Button>
            </FormContainer>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default EditBook;
