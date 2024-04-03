import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import Home from '@/pages/Home';
import SignIn from '@/pages/Login';
import SignUp from '@/pages/SignUp';

export const Router = () => {
  const { isLogin } = useAuth();
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {isLogin() ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          ) : (
            <Route path="/" element={<SignUp />} />
          )}
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
