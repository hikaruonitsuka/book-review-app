import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import SignUp from '@/pages/SignUp';
import { useAuth } from '@/providers/authProvider';

export const Router = () => {
  const { isLogin } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {isLogin() ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<SignUp />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
