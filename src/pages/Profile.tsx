import { useEffect, useState } from 'react';

import { useCookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import Button from '@/components/Button';
import Container from '@/components/Container';
import ErrorText from '@/components/form/ErrorText';
import FormContainer from '@/components/form/FormContainer';
import FormItem from '@/components/form/FormItem';
import FormItemList from '@/components/form/FormItemList';
import { API_URL } from '@/config';
import { useAuth } from '@/hooks/useAuth';
import { UpdateUserNameType, UpdateUserName } from '@/utils/validation';

const Profile = () => {
  const [cookies] = useCookies(['token']);
  const { user, setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    // useFormのジェネリクスにはdefaultValuesの型を渡す
  } = useForm<UpdateUserNameType>({
    // zodResolverの引数にvalidation時に実行するschemaを渡す
    resolver: zodResolver(UpdateUserName),
    defaultValues: {
      name: user?.name,
    },
  });

  useEffect(() => {
    // ユーザー情報が更新されたらフォームの値をリセット
    if (user) {
      reset({ name: user.name });
    }
  }, [user, reset]);

  const onChangeName: SubmitHandler<UpdateUserNameType> = async (data) => {
    try {
      const userData = {
        name: data.name,
      };
      const token = cookies.token;
      const response = await axios.put(`${API_URL}/users`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ユーザー情報を更新
      if (user) {
        setUser({
          ...user,
          name: response.data.name,
        });
      }
    } catch (error) {
      setError('ユーザーネームの変更に失敗しました。');
      console.log(error);
    }
  };

  return (
    <div className="grid min-h-full place-items-center">
      <Container size="sm">
        <section className="flex w-full flex-col gap-y-14">
          <h2 className="text-center text-2xl font-bold">
            ユーザーネームの変更
          </h2>
          <div className="flex flex-col gap-y-4">
            {error && <ErrorText>{error}</ErrorText>}
            <FormContainer onSubmit={handleSubmit(onChangeName)}>
              <FormItemList>
                <FormItem>
                  <div className="flex w-full flex-col gap-y-1">
                    <input
                      className="w-full rounded border px-2 py-1"
                      type="text"
                      id="name"
                      {...register('name')}
                    />
                    {errors.name?.message && (
                      <ErrorText>{errors.name?.message}</ErrorText>
                    )}
                  </div>
                </FormItem>
              </FormItemList>
              <Button>変更する</Button>
            </FormContainer>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Profile;
