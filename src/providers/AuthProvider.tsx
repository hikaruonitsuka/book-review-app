import { createContext, useState } from 'react';

import { useCookies } from 'react-cookie';

import axios from 'axios';

import { API_URL } from '@/config';
import { AuthContextType } from '@/types/AuthContextType';
import { UserType } from '@/types/UserType';

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: Props) => {
  const [cookies] = useCookies(['token']);
  const [user, setUser] = useState<UserType | null>(null);

  const fetchUser = async () => {
    try {
      if (cookies.token) {
        const response = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        const userData: UserType = response.data;
        setUser(userData);
      }
    } catch (error) {
      console.error('ユーザー情報の取得に失敗しました', error);
    }
  };

  const isLogin = () => {
    // トークンの存在によりログイン状態を判断
    return Boolean(cookies['token']);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, isLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
