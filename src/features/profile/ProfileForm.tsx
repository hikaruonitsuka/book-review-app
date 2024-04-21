import { useState } from 'react';

import { useCookies } from 'react-cookie';
import { useForm, SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import Button from '@/components/Button';
import ErrorText from '@/components/form/ErrorText';
import FormContainer from '@/components/form/FormContainer';
import FormItem from '@/components/form/FormItem';
import FormItemList from '@/components/form/FormItemList';
import SuccessText from '@/components/form/SuccessText';
import { API_URL } from '@/config';
import { useAuth } from '@/hooks/useAuth';
import { UpdateUserNameType, UpdateUserName } from '@/utils/validation';

type Props = {
  defaultValues: UpdateUserNameType;
};

const ProfileForm = ({ defaultValues }: Props) => {
  const { user, setUser } = useAuth();
  const [cookies] = useCookies(['token']);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // useFormのジェネリクスにはdefaultValuesの型を渡す
  } = useForm<UpdateUserNameType>({
    // zodResolverの引数にvalidation時に実行するschemaを渡す
    resolver: zodResolver(UpdateUserName),
    defaultValues: defaultValues,
  });

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
        setSuccess('ユーザー名を変更しました！');
      }
    } catch (error) {
      setError('ユーザー名の変更に失敗しました。');
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-y-4">
      {success && <SuccessText>{success}</SuccessText>}
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
  );
};

export default ProfileForm;
