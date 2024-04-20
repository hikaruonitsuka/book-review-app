import { useState } from 'react';

import { useCookies } from 'react-cookie';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import { API_URL } from '@/config';
import { BookReviewType } from '@/utils/validation';

export const useEditBookReview = () => {
  const [cookies] = useCookies(['token']);
  const params = useParams();
  const detailId = params.id;

  const [error, setError] = useState<string | null>(null);

  // レビューを編集する
  const editReview: SubmitHandler<BookReviewType> = async (data) => {
    try {
      const reviewData = {
        title: data.title,
        url: data.url,
        detail: data.detail,
        review: data.review,
      };

      await axios.put(`${API_URL}/books/${detailId}`, reviewData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
    } catch (error) {
      setError('エラーが発生しました。もう一度お試しください。');
      console.log(error);
    }
  };

  return { editReview, error };
};
