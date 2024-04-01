import * as z from 'zod';

// imageのtype指定
const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const FormSchema = z.object({
  name: z.string().min(1, { message: 'ユーザー名を入力してください' }),
  email: z
    .string()
    .min(1, { message: 'メールアドレスを入力してください' })
    .email({ message: '無効なメールアドレスです' }),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で半角英数字混合で入力してください')
    .regex(
      /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
      'パスワードは半角英数字混合で入力してください',
    ),
  file: z
    .custom<FileList>()
    .refine((file) => 0 < file.length, {
      message: '画像ファイルの添付は必須です',
    })
    .transform((files) => files[0])
    .refine((file) => IMAGE_TYPES.includes(file.type), {
      message: 'jpeg, jpg, png, webpのいずれかの画像を選択してください',
    }),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
