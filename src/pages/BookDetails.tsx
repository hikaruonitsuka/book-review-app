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
  const id = params.id;
  const { isLogin } = useAuth();
  const [cookies] = useCookies(['token']);

  if (!isLogin) {
    return (
      <div className="grid h-full place-items-center">
        <p>ログインすると閲覧できます</p>
      </div>
    );
  }

  const token = cookies.token;

  const { data, error, isLoading } = useSWR(
    [`${API_URL}/books/${id}`, token],
    ([url, token]: [string, string]) => fetchWithToken(url, token),
  );

  console.log(data);

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

  return (
    <Container size="lg">
      <p>テスト</p>
    </Container>
  );
};

export default BookDetails;
