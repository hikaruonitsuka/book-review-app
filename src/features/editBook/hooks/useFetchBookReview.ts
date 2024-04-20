import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

import useSWR from 'swr';

import { API_URL } from '@/config';
import { fetchWithToken } from '@/utils/fetcher';

export const useFetchBookReview = () => {
  const [cookies] = useCookies(['token']);
  const params = useParams();

  const detailId = params.id;
  const token = cookies.token;

  const { data, error, isLoading } = useSWR(
    [`${API_URL}/books/${detailId}`, token],
    ([url, token]: [string, string]) => fetchWithToken(url, token),
  );

  return { data, error, isLoading };
};
