import { useCookies } from 'react-cookie';

import axios from 'axios';

import { API_URL } from '@/config';

export const useSendSelectedBookLog = () => {
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  const sendSelectedBookLog = async (bookId: string) => {
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

  return sendSelectedBookLog;
};
