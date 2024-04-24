import { useEffect } from 'react';

import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

import {
  LogIn,
  LogOut,
  MessageSquareDiff,
  UserCog,
  UserPlus,
} from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [, , removeCookie] = useCookies(['token']);
  const { user, setUser, fetchUser, isLogin } = useAuth();
  const navigate = useNavigate();

  // ユーザー情報の取得
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // ログアウト処理
  const logout = () => {
    removeCookie('token', { path: '/' });
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <h1 className="font-bold text-cyan-800">
          <Link to="/">BOOK REVIEW APP</Link>
        </h1>
        {isLogin ? (
          <div className="flex items-center gap-x-4 sm:gap-x-10">
            <div className="font-bold text-orange-600">{user?.name}</div>
            <div className="flex items-center gap-x-4">
              <Link to="/new" className="flex items-center gap-x-2">
                <MessageSquareDiff strokeWidth={2} size={20} />
                <span className="hidden text-sm font-bold sm:block">
                  新規レビュー
                </span>
              </Link>
              <Link to="/profile" className="flex items-center gap-x-2">
                <UserCog strokeWidth={2} size={20} />
                <span className="hidden text-sm font-bold sm:block">
                  ユーザー情報
                </span>
              </Link>
              <button className="flex items-center gap-x-2" onClick={logout}>
                <LogOut strokeWidth={2} size={20} />
                <span className="hidden text-sm font-bold sm:block">
                  ログアウト
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-x-4 sm:gap-x-8">
            <Link to="/signup" className="flex items-center gap-x-2">
              <UserPlus strokeWidth={2} size={20} />
              <span className="text-sm font-bold">新規登録</span>
            </Link>
            <Link to="/login" className="flex items-center gap-x-2">
              <LogIn strokeWidth={2} size={20} />
              <span className="text-sm font-bold">ログイン</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
