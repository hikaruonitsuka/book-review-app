import { User } from '@/types/User';

export type AuthContextType = {
  user: User | null;
  isLogin: () => boolean;
  logout: () => void;
  fetchUser: () => Promise<void>;
};
