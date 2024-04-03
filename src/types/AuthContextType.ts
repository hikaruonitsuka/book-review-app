import { UserType } from '@/types/UserType';

export type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  fetchUser: () => Promise<void>;
  isLogin: () => boolean;
};
