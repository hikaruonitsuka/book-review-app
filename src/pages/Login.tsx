import { useCookies } from 'react-cookie';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import Button from '@/components/Button';
import Container from '@/components/Container';
import ErrorText from '@/components/form/ErrorText';
import { API_URL } from '@/config';
import { LoginSchemaType, LoginSchema } from '@/utils/validation';

const SignIn = () => {
  const [, setCookie] = useCookies(['token']);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  // サインイン処理
  const onSignIn: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      const userData = {
        email: data.email,
        password: data.password,
      };

      // JWT tokenの設定
      const response = await axios.post(`${API_URL}/signin`, userData);
      const token = response.data.token;
      setCookie('token', token, { path: '/' });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid min-h-full place-items-center">
      <Container>
        <section className="flex w-full flex-col gap-y-14">
          <h2 className="text-center text-2xl font-bold">サインイン</h2>
          <form
            className="flex flex-col items-center justify-center gap-y-12"
            onSubmit={handleSubmit(onSignIn)}
          >
            <div className="flex w-full flex-1 flex-col gap-y-4">
              <div className="flex flex-col items-start gap-y-2">
                <label className="font-bold" htmlFor="email">
                  メールアドレス
                </label>
                <div className="flex w-full flex-col gap-y-1">
                  <input
                    className="w-full rounded border px-2 py-1"
                    id="email"
                    autoComplete="email"
                    {...register('email')}
                  />
                  {errors.email?.message && (
                    <ErrorText>{errors.email?.message}</ErrorText>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start gap-y-2">
                <label className="font-bold" htmlFor="password">
                  パスワード
                </label>
                <div className="flex w-full flex-col gap-y-1">
                  <input
                    className="w-full rounded border px-2 py-1"
                    id="password"
                    autoComplete="new-password"
                    {...register('password')}
                  />
                  {errors.password?.message && (
                    <ErrorText>{errors.password?.message}</ErrorText>
                  )}
                </div>
              </div>
            </div>
            <Button>サインイン</Button>
          </form>
        </section>
      </Container>
    </div>
  );
};

export default SignIn;
