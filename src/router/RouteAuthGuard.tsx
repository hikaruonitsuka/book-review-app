import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

type Props = {
  redirect: string;
  component: React.ReactNode;
  redirectIfLoggedIn?: boolean;
};

const RouteAuthGuard = ({ redirect, component, redirectIfLoggedIn }: Props) => {
  const { isLogin } = useAuth();

  // ログインしていなければリダイレクト
  if (!isLogin && !redirectIfLoggedIn) {
    return <Navigate to={redirect} />;
  }

  // ログインしている場合、リダイレクト
  if (isLogin && redirectIfLoggedIn) {
    return <Navigate to={redirect} />;
  }
  return <>{component}</>;
};

export default RouteAuthGuard;
