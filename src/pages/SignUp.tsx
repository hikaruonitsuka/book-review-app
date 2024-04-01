import { useState } from 'react';

import { useCookies } from 'react-cookie';
import { useForm, SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Compressor from 'compressorjs';

import Button from '@/components/Button';
import Container from '@/components/Container';
import ErrorText from '@/components/form/ErrorText';
import { API_URL } from '@/config';
import { FormSchema, FormSchemaType } from '@/utils/validation';

// 画像圧縮処理
const compressFile = (file: File) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      width: 400,
      height: 400,
      quality: 0.8,
      resize: 'cover',
      convertSize: 1000000,
      success: resolve,
      error: reject,
    });
  });
};

const SignUp = () => {
  const [, setCookie] = useCookies(['token']);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  // ファイルを圧縮してプレビュー表示させる
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length < 0) return;

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

  const onSignUp: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const user = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      // JWT tokenの設定
      const response = await axios.post(`${API_URL}/users`, user);
      const token = response.data.token;
      setCookie('token', token, { path: '/' });

      // const compressedFile = await compressFile(data.file);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid min-h-full place-items-center">
      <Container>
        <section className="flex w-full flex-col gap-y-14">
          <h2 className="text-center text-2xl font-bold">ユーザー作成</h2>
          <form
            className="flex flex-col items-center justify-center gap-y-12"
            onSubmit={handleSubmit(onSignUp)}
          >
            <div className="flex w-full flex-1 flex-col gap-y-4">
              <div className="flex flex-col items-start gap-y-2">
                <label className="font-bold" htmlFor="name">
                  ユーザー名
                </label>
                <div className="flex w-full flex-col gap-y-1">
                  <input
                    className="w-full rounded border px-2 py-1"
                    id="name"
                    autoComplete="username"
                    {...register('name')}
                  />
                  {errors.name?.message && (
                    <ErrorText>{errors.name?.message}</ErrorText>
                  )}
                </div>
              </div>
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
              <div className="flex flex-col items-start gap-y-2">
                <label className="font-bold" htmlFor="file">
                  アイコン
                </label>
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
              </div>
            </div>
            <Button>作成する</Button>
          </form>
        </section>
      </Container>
    </div>
  );
};

export default SignUp;
