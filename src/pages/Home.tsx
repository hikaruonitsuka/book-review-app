import Container from '@/components/Container';
import { useAuth } from '@/hooks/useAuth';

const Home = () => {
  const { isLogin } = useAuth();
  return (
    <Container>
      {isLogin() ? <div>ログイン済み</div> : <div>未ログイン</div>}
    </Container>
  );
};

export default Home;
