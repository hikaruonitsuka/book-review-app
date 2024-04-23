import Container from '@/components/Container';
import LoginForm from '@/features/login/LoginForm';

const Login = () => {
  return (
    <div className="grid min-h-full place-items-center">
      <Container size="sm">
        <section className="flex w-full flex-col gap-y-14">
          <h2 className="text-center text-2xl font-bold">ログイン</h2>
          <LoginForm />
        </section>
      </Container>
    </div>
  );
};

export default Login;
