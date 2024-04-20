import { useState } from 'react';

import { useCookies } from 'react-cookie';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { API_URL } from '@/config';
import { BookReviewType } from '@/utils/validation';

export const useCreateBookReview = () => {
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

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

      alert('レビューを作成しました！');
      navigate('/');
    } catch (error) {
      setError('作成時にエラーが発生しました。もう一度お試しください。');
      console.log(error);
    }
  };

  return { createReview, error };
};
