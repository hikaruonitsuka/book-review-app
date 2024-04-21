import Container from '@/components/Container';
import SignUpForm from '@/features/signUp/SignUpForm';

const SignUp = () => {
  return (
    <div className="grid min-h-full place-items-center">
      <Container size="sm">
        <section className="flex w-full flex-col gap-y-14">
          <h2 className="text-center text-2xl font-bold">ユーザー作成</h2>
          <SignUpForm />
        </section>
      </Container>
    </div>
  );
};

export default SignUp;
