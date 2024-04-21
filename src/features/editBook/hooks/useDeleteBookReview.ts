import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { API_URL } from '@/config';

export const useDeleteBookReview = () => {
  const [cookies] = useCookies(['token']);
  const params = useParams();
  const detailId = params.id;
  const navigate = useNavigate();

  // レビューを削除する
  const handleDeleteReview = async () => {
    // axiosを使ってDELETEリクエストを送信する
    try {
      await axios.delete(`${API_URL}/books/${detailId}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      alert('レビューを削除しました！');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return { handleDeleteReview };
};
