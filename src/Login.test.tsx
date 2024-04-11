import { BrowserRouter as Router } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Login from '@/pages/Login.tsx';

describe('ログインページ', () => {
  test('ログイン画面にメールアドレスとパスワード入力欄が存在する', () => {
    render(
      <Router>
        <Login />
      </Router>,
    );

    // メールアドレス入力欄の存在を確認
    const emailInput = screen.getByTestId('input-email');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');

    // パスワード入力欄の存在を確認
    const passwordInput = screen.getByTestId('input-password');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
