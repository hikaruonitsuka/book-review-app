import { useAuth } from '@/providers/authProvider';

const Header = () => {
  const { isLogin, logout } = useAuth();

  return (
    <header className="p-4">
      <div className="mx-auto flex max-w-6xl justify-between">
        <a href="#">LOGO</a>
        {isLogin() ? (
          <button type="button" onClick={logout}>
            LOGOUT
          </button>
        ) : (
          <p>ゲストユーザー</p>
        )}
      </div>
    </header>
  );
};

export default Header;
