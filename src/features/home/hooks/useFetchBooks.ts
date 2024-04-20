import { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';

import useSWR from 'swr';

import { API_URL } from '@/config';
import { fetchData, fetchWithToken } from '@/utils/fetcher';

export const useFetchBooks = () => {
  // URLクエリパラメータからoffsetを取得
  const [searchParams] = useSearchParams();
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  // tokenを取得
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

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
      ? [`${API_URL}/books?offset=${offset * 10}`, token]
      : `${API_URL}/public/books?offset=${offset * 10}`,
    fetcher,
  );

  const { data: nextPageData } = useSWR(
    currentPageData
      ? token
        ? [`${API_URL}/books?offset=${(offset + 1) * 10}`, token]
        : `${API_URL}/public/books?offset=${(offset + 1) * 10}`
      : null,
    fetcher,
  );

  const { data: nextNextPageData } = useSWR(
    nextPageData
      ? token
        ? [`${API_URL}/books?offset=${(offset + 2) * 10}`, token]
        : `${API_URL}/public/books?offset=${(offset + 2) * 10}`
      : null,
    fetcher,
  );

  const [isLastPage, setIsLastPage] = useState(false);
  const [isPenultimatePage, setIsPenultimatePage] = useState(false);

  // 次のページとその次のページのデータが取得できたら、最終ページかどうかを判定
  useEffect(() => {
    if (nextPageData && nextPageData.length === 0) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }

    if (nextNextPageData && nextNextPageData.length === 0) {
      setIsPenultimatePage(true);
    } else {
      setIsPenultimatePage(false);
    }
  }, [nextPageData, nextNextPageData]);

  return {
    currentPageData,
    error,
    isLoading,
    offset,
    isLastPage,
    isPenultimatePage,
  };
};
