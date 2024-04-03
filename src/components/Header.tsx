import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [, , removeCookie] = useCookies(['token']);
  const { setUser, isLogin } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    removeCookie('token', { path: '/' });
    setUser(null);
    navigate('/signin');
  };

  return (
    <header className="p-4">
      <div className="mx-auto flex max-w-6xl justify-between">
        <Link to="/">LOGO</Link>
        {isLogin() ? (
          <button type="button" onClick={logout}>
            ログアウト
          </button>
        ) : (
          <Link to="/signin">ログイン</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
