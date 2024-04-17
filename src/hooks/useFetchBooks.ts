import useSWR from 'swr';

import { fetchData, fetchWithToken } from '@/utils/fetcher';

type UseFetchBooksUrl = {
  url: string;
  offset: number;
  token?: string;
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
  );

  // 1ページ先のデータをプリフェッチ
  const { data: nextPageData } = useSWR(
    currentPageData
      ? token
        ? [`${url}?offset=${(offset + 1) * 10}`, token]
        : `${url}?offset=${(offset + 1) * 10}`
      : null,
    fetcher,
  );

  // 2ページ先のデータをプリフェッチ
  const { data: nextNextPageData } = useSWR(
    nextPageData
      ? token
        ? [`${url}?offset=${(offset + 2) * 10}`, token]
        : `${url}?offset=${(offset + 2) * 10}`
      : null,
    fetcher,
  );

  return { currentPageData, nextPageData, nextNextPageData, error, isLoading };
};
