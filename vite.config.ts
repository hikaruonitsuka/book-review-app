import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import env from 'vite-plugin-env-compatible';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    env({ prefix: 'VITE', mountedPath: 'process.env' }),
  ],
});
