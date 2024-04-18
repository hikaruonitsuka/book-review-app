import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

import useSWR from 'swr';

import Container from '@/components/Container';
import ErrorText from '@/components/form/ErrorText';
import { API_URL } from '@/config';
import { useAuth } from '@/hooks/useAuth';
import { fetchWithToken } from '@/utils/fetcher';

const BookDetails = () => {
  const params = useParams();
  const detailId = params.id;
  const { isLogin } = useAuth();
  const [cookies] = useCookies(['token']);

  const token = cookies.token;

  const { data, error, isLoading } = useSWR(
    token ? [`${API_URL}/books/${detailId}`, token] : null,
    ([url, token]: [string, string]) => fetchWithToken(url, token),
  );

  if (!isLogin) {
    return (
      <div className="grid h-full place-items-center">
        <p>ログインすると閲覧できます</p>
      </div>
    );
  }

  if (error)
    return (
      <div className="grid h-full place-items-center">
        <ErrorText>エラーが発生しました。</ErrorText>
      </div>
    );

  if (isLoading) {
    return (
      <div className="grid h-full place-items-center">
        <div>Loading...</div>
      </div>
    );
  }

  const { id, title, url, detail, review, reviewer } = data;

  return (
    <Container size="lg">
      <p>{id}</p>
      <p>{title}</p>
      <p>{url}</p>
      <p>{detail}</p>
      <p>{review}</p>
      <p>{reviewer}</p>
    </Container>
  );
};

export default BookDetails;
