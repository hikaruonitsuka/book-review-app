import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

type Props = {
  redirect: string;
  component: React.ReactNode;
  redirectIfLogin?: boolean;
};

const RouteAuthGuard = ({ redirect, component, redirectIfLogin }: Props) => {
  const { isLogin } = useAuth();

  // ログインしていなければリダイレクト
  if (!isLogin && !redirectIfLogin) {
    return <Navigate to={redirect} />;
  }

  // ログインしている場合、リダイレクト
  if (isLogin && redirectIfLogin) {
    return <Navigate to={redirect} />;
  }
  return <>{component}</>;
};

export default RouteAuthGuard;
