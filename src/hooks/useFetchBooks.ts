import { useCookies } from 'react-cookie';

import useSWR from 'swr';

import { fetchWithToken } from '@/utils/fetcher';

type UseFetchBooksUrl = {
  url: string;
  offset: number;
};

const swrOptions = {
  revalidateIfStale: false, // キャッシュがある場合に再検証しない
  revalidateOnFocus: false, // ブラウザのタブ切り替え時に再検証しない
};

export const useFetchBooks = ({ url, offset }: UseFetchBooksUrl) => {
  const [cookies] = useCookies(['token']);
  const token: string = cookies.token;

  const {
    data: currentPageData,
    error,
    isLoading,
  } = useSWR(
    [`${url}?offset=${offset * 10}`, token],
    ([url, token]) => fetchWithToken(url, token),
    swrOptions,
  );

  // 1ページ先のデータをプリフェッチ
  const { data: nextPageData } = useSWR(
    currentPageData ? [`${url}?offset=${(offset + 1) * 10}`, token] : null,
    ([url, token]) => fetchWithToken(url, token),
    swrOptions,
  );

  // 2ページ先のデータをプリフェッチ
  const { data: nextNextPageData } = useSWR(
    currentPageData ? [`${url}?offset=${(offset + 2) * 10}`, token] : null,
    ([url, token]) => fetchWithToken(url, token),
    swrOptions,
  );

  return { currentPageData, nextPageData, nextNextPageData, error, isLoading };
};
