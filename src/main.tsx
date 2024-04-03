import React from 'react';

import { CookiesProvider } from 'react-cookie';

import ReactDOM from 'react-dom/client';

import App from '@/App.tsx';
import '@/index.css';
import { AuthProvider } from '@/providers/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* @ts-expect-error TypeScriptの型定義で問題が発生しているため、一時的に無視します */}
    <CookiesProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CookiesProvider>
  </React.StrictMode>,
);
