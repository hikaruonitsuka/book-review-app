import { useEffect } from 'react';

import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

import { LogOut } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [, , removeCookie] = useCookies(['token']);
  const { user, setUser, fetchUser, isLogin } = useAuth();
  const navigate = useNavigate();

  // ユーザー情報の取得
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = () => {
    removeCookie('token', { path: '/' });
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <h1 className="font-bold text-cyan-600">
          <Link to="/">BOOK REVIEW APP</Link>
        </h1>
        {isLogin ? (
          <div className="flex items-center gap-x-8">
            <Link to="/profile" className="flex items-center gap-x-4">
              <div className="overflow-hidden rounded-full">
                <img src={user?.iconUrl} alt="" width="40" height="40" />
              </div>
              <span className="font-bold">{user?.name}</span>
            </Link>
            <button onClick={logout}>
              <LogOut strokeWidth={2} size={20} />
            </button>
          </div>
        ) : (
          <Link to="/login">ログイン</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
