import Container from '@/components/Container';
import { useAuth } from '@/providers/authProvider';

const Home = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <Container>
      <p>{user?.name}</p>
      <p>{user?.iconUrl}</p>
    </Container>
  );
};

export default Home;
