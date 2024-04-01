import { createContext, useContext, useEffect, useState } from 'react';

import { useCookies } from 'react-cookie';

import axios from 'axios';

import { API_URL } from '@/config';
import { AuthContextType } from '@/types/AuthContext';
import { User } from '@/types/User';

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthProvider内でuseAuthを利用してください');
  }
  return context;
};

export const AuthProvider = ({ children }: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [user, setUser] = useState<User | null>(null); // ユーザー情報を状態として保持

  // const login = async (email: string, password: string) => {
  // 	try {
  // 		const response = await axios.post(`${API_URL}/signin`, { email, password });
  //     const token = response.data.token;
  //     setCookie('token', token, { path: '/' });
  // 		setUser(user); // レスポンスから取得したユーザー情報をセット
  // 	} catch (error) {
  // 		console.error(error);
  // 		throw error; // エラーハンドリングを改善するために、エラーを再スローするかもしれません。
  // 	}
  // };

  // ユーザー情報を取得する関数
  const fetchUser = async () => {
    try {
      if (cookies.token) {
        const response = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        const userData: User = response.data;
        setUser(userData);
      }
    } catch (error) {
      console.error('ユーザー情報の取得に失敗しました', error);
    }
  };

  const logout = () => {
    removeCookie('token', { path: '/' });
    setUser(null); // ユーザー情報をクリア
  };

  const isLogin = () => {
    return !!cookies['token']; // トークンの存在によりログイン状態を判断
  };

  return (
    <AuthContext.Provider value={{ user, isLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
