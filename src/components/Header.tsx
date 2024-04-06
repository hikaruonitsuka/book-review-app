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
    <header className="py-4">
      <div className="mx-auto flex max-w-6xl justify-between px-4">
        <h1>
          <Link to="/">LOGO</Link>
        </h1>
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
