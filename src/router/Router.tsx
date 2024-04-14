import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layout';
import CreateBookReviewPage from '@/pages/CreateBookReview';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import SignUp from '@/pages/SignUp';
import RouteAuthGuard from '@/router/RouteAuthGuard';

export const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<RouteAuthGuard component={<Home />} redirect="/login" />}
          />
          <Route
            path="/books"
            element={<RouteAuthGuard component={<Home />} redirect="/login" />}
          />
          <Route
            path="/signup"
            element={
              <RouteAuthGuard
                component={<SignUp />}
                redirect="/"
                redirectIfLoggedIn={true}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RouteAuthGuard
                component={<Login />}
                redirect="/"
                redirectIfLoggedIn={true}
              />
            }
          />
          <Route
            path="/new"
            element={
              <RouteAuthGuard
                component={<CreateBookReviewPage />}
                redirect="/"
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
