import { createContext, useCallback, useMemo, useState } from 'react';

import { useCookies } from 'react-cookie';

import axios from 'axios';

import { API_URL } from '@/config';
import { AuthUserContextType } from '@/types/AuthUserContextType';
import { UserType } from '@/types/UserType';

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthUserContextType>(
  {} as AuthUserContextType,
);

export const AuthProvider = ({ children }: Props) => {
  const [cookies] = useCookies(['token']);
  const [user, setUser] = useState<UserType | null>(null);

  const fetchUser = useCallback(async () => {
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
  }, [cookies.token]);

  const isLogin = useMemo(() => {
    // トークンの存在によりログイン状態を判断
    return Boolean(cookies['token']);
  }, [cookies]);

  const value: AuthUserContextType = { user, setUser, fetchUser, isLogin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
