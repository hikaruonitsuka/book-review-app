import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layout';
import BookDetails from '@/pages/BookDetails';
import CreateBookReviewPage from '@/pages/CreateBookReview';
import EditBook from '@/pages/EditBook';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Profile from '@/pages/Profile';
import SignUp from '@/pages/SignUp';
import RouteAuthGuard from '@/router/RouteAuthGuard';

export const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Home />} />
          <Route path="/detail/:id" element={<BookDetails />} />
          <Route
            path="/edit/:id"
            element={<RouteAuthGuard component={<EditBook />} redirect="/" />}
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
          <Route
            path="/profile"
            element={<RouteAuthGuard component={<Profile />} redirect="/" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
