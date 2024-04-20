import { useState } from 'react';

import { useCookies } from 'react-cookie';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import Button from '@/components/Button';
import ErrorText from '@/components/form/ErrorText';
import FormContainer from '@/components/form/FormContainer';
import FormItem from '@/components/form/FormItem';
import FormItemList from '@/components/form/FormItemList';
import FormLabel from '@/components/form/FormLabel';
import { API_URL } from '@/config';
import { LoginSchemaType, LoginSchema } from '@/utils/validation';

const LoginForm = () => {
  const navigate = useNavigate();

  const [, setCookie] = useCookies(['token']);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // useFormのジェネリクスにはdefaultValuesの型を渡す
  } = useForm<LoginSchemaType>({
    // zodResolverの引数にvalidation時に実行するschemaを渡す
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
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
      setError('メールアドレスまたはパスワードが正しくありません');
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-y-4">
      {error && <ErrorText>{error}</ErrorText>}
      <FormContainer onSubmit={handleSubmit(onSignIn)}>
        <FormItemList>
          <FormItem>
            <FormLabel htmlFor="email">メールアドレス</FormLabel>
            <div className="flex w-full flex-col gap-y-1">
              <input
                className="w-full rounded border px-2 py-1"
                type="email"
                id="email"
                autoComplete="email"
                data-cy="input-email"
                data-testid="input-email"
                {...register('email')}
              />
              {errors.email?.message && (
                <ErrorText>{errors.email?.message}</ErrorText>
              )}
            </div>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="password">パスワード</FormLabel>
            <div className="flex w-full flex-col gap-y-1">
              <input
                className="w-full rounded border px-2 py-1"
                type="password"
                id="password"
                autoComplete="new-password"
                data-cy="input-password"
                data-testid="input-password"
                {...register('password')}
              />
              {errors.password?.message && (
                <ErrorText>{errors.password?.message}</ErrorText>
              )}
            </div>
          </FormItem>
        </FormItemList>
        <Button>サインイン</Button>
      </FormContainer>
    </div>
  );
};

export default LoginForm;
