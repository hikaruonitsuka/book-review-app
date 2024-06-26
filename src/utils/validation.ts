import * as z from 'zod';

// imageのtype指定
const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

/**
 * ユーザー登録時のバリデーション
 */
export const SignUpSchema = z.object({
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

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

/**
 * ログイン時のバリデーション
 */
export const LoginSchema = z.object({
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
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

/**
 * 本のレビュー作成時のバリデーション
 */
export const BookReview = z.object({
  title: z.string().min(1, { message: '書籍のタイトルを入力してください' }),
  url: z.string().min(1, { message: '書籍のURLを入力してください' }),
  detail: z
    .string()
    .min(1, { message: '書籍についての詳細を入力してください' }),
  review: z
    .string()
    .min(1, { message: '書籍についてのレビューを入力してください' }),
});

export type BookReviewType = z.infer<typeof BookReview>;

/**
 * ユーザーの名前変更時のバリデーション
 */
export const UpdateUserName = z.object({
  name: z.string().min(1, { message: 'ユーザー名を入力してください' }),
});

export type UpdateUserNameType = z.infer<typeof UpdateUserName>;
