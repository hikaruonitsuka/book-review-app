import { useState } from 'react';

import { useCookies } from 'react-cookie';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Compressor from 'compressorjs';

import Button from '@/components/Button';
import ErrorText from '@/components/form/ErrorText';
import FormContainer from '@/components/form/FormContainer';
import FormItem from '@/components/form/FormItem';
import FormItemList from '@/components/form/FormItemList';
import FormLabel from '@/components/form/FormLabel';
import { API_URL } from '@/config';
import { SignUpSchemaType, SignUpSchema } from '@/utils/validation';

// 画像圧縮処理
const compressFile = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      width: 400,
      height: 400,
      quality: 0.8,
      resize: 'cover',
      convertSize: 1000000,
      success(result) {
        const compressedFile = new File([result], file.name, {
          type: result.type,
          lastModified: Date.now(),
        });
        resolve(compressedFile);
      },
      error: reject,
    });
  });
};

const SignUpForm = () => {
  const [, setCookie] = useCookies(['token']);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // useFormのジェネリクスにはdefaultValuesの型を渡す
  } = useForm<SignUpSchemaType>({
    // zodResolverの引数にvalidation時に実行するschemaを渡す
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      file: undefined,
    },
  });

  // ファイルを圧縮してプレビュー表示させる
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length == 0) {
      setPreviewUrl('');
      return;
    }

    const file = files[0];
    new Compressor(file, {
      width: 400,
      height: 400,
      quality: 0.8,
      resize: 'cover',
      convertSize: 1000000,
      success(file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      },
      error(err) {
        console.error(err.message);
      },
    });
  };

  // サインアップ処理
  const onSignUp: SubmitHandler<SignUpSchemaType> = async (data) => {
    try {
      const user = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      // JWT tokenの設定
      const userResponse = await axios.post(`${API_URL}/users`, user);
      const token = userResponse.data.token;
      setCookie('token', token, { path: '/' });

      // 添付されたファイルを圧縮し、発行されたtokenを利用してアップロード
      const compressedFile = await compressFile(data.file);
      const formData = new FormData();
      formData.append('icon', compressedFile);

      await axios.post(`${API_URL}/uploads`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.ErrorMessageJP);
        console.error(error);
      } else {
        setError('予期せぬエラーが発生しました');
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      {error && <ErrorText>{error}</ErrorText>}
      <FormContainer onSubmit={handleSubmit(onSignUp)}>
        <FormItemList>
          <FormItem>
            <FormLabel htmlFor="name">ユーザー名</FormLabel>
            <div className="flex w-full flex-col gap-y-1">
              <input
                className="w-full rounded border px-2 py-1"
                type="text"
                id="name"
                autoComplete="username"
                {...register('name')}
              />
              {errors.name?.message && (
                <ErrorText>{errors.name?.message}</ErrorText>
              )}
            </div>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="email">メールアドレス</FormLabel>
            <div className="flex w-full flex-col gap-y-1">
              <input
                className="w-full rounded border px-2 py-1"
                type="email"
                id="email"
                autoComplete="email"
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
                {...register('password')}
              />
              {errors.password?.message && (
                <ErrorText>{errors.password?.message}</ErrorText>
              )}
            </div>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="file">アイコン</FormLabel>
            <div className="flex flex-col gap-y-1">
              {previewUrl && (
                <div className="aspect-square w-[100px] overflow-hidden rounded-full">
                  <img
                    className="object-cover"
                    src={previewUrl}
                    alt="アイコンプレビュー"
                  />
                </div>
              )}
              <input
                id="file"
                type="file"
                accept=".jpg, .jpeg, .png"
                {...register('file', { onChange: onFileChange })}
              />
              {errors.file?.message && (
                <ErrorText>{errors.file?.message}</ErrorText>
              )}
            </div>
          </FormItem>
        </FormItemList>
        <Button>作成する</Button>
      </FormContainer>
    </div>
  );
};

export default SignUpForm;
