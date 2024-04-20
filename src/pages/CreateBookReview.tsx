import { useState } from 'react';

import { useCookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import Button from '@/components/Button';
import Container from '@/components/Container';
import ErrorText from '@/components/form/ErrorText';
import FormContainer from '@/components/form/FormContainer';
import FormItem from '@/components/form/FormItem';
import FormItemList from '@/components/form/FormItemList';
import FormLabel from '@/components/form/FormLabel';
import { API_URL } from '@/config';
import { BookReviewType, BookReview } from '@/utils/validation';

const CreateBookReviewPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookReviewType>({
    resolver: zodResolver(BookReview),
  });

  // 新規レビューを作成する
  const createReview: SubmitHandler<BookReviewType> = async (data) => {
    try {
      const reviewData = {
        title: data.title,
        url: data.url,
        detail: data.detail,
        review: data.review,
      };

      await axios.post(`${API_URL}/books`, reviewData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      navigate('/');
    } catch (error) {
      setError('作成時にエラーが発生しました。もう一度お試しください。');
      console.log(error);
    }
  };

  return (
    <div className="grid min-h-full place-items-center">
      <Container size="md">
        <section className="flex w-full flex-col gap-y-14">
          <h2 className="text-center text-2xl font-bold">新規レビュー作成</h2>
          <div className="flex flex-col gap-y-4">
            {error && <ErrorText>{error}</ErrorText>}
            <FormContainer onSubmit={handleSubmit(createReview)}>
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
              <Button>レビューを作成</Button>
            </FormContainer>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default CreateBookReviewPage;
