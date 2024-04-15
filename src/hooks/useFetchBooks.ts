import useSWR from 'swr';

import { fetchData, fetchWithToken } from '@/utils/fetcher';

type UseFetchBooksUrl = {
  url: string;
  offset: number;
  token?: string;
};

const swrOptions = {
  revalidateIfStale: false, // キャッシュがある場合に再検証しない
  revalidateOnFocus: false, // ブラウザのタブ切り替え時に再検証しない
};

export const useFetchBooks = ({ url, offset, token }: UseFetchBooksUrl) => {
  // tokenでfetcherを分岐
  const fetcher = token
    ? ([url, token]: [string, string]) => fetchWithToken(url, token)
    : fetchData;

  const {
    data: currentPageData,
    error,
    isLoading,
  } = useSWR(
    token
      ? [`${url}?offset=${offset * 10}`, token]
      : `${url}?offset=${offset * 10}`,
    fetcher,
    swrOptions,
  );

  // 1ページ先のデータをプリフェッチ
  const { data: nextPageData } = useSWR(
    currentPageData
      ? token
        ? [`${url}?offset=${(offset + 1) * 10}`, token]
        : `${url}?offset=${(offset + 1) * 10}`
      : null,
    fetcher,
    swrOptions,
  );

  // 2ページ先のデータをプリフェッチ
  const { data: nextNextPageData } = useSWR(
    nextPageData
      ? token
        ? [`${url}?offset=${(offset + 2) * 10}`, token]
        : `${url}?offset=${(offset + 2) * 10}`
      : null,
    fetcher,
    swrOptions,
  );

  return { currentPageData, nextPageData, nextNextPageData, error, isLoading };
};
