/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const root = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  resolve: {
    alias: {
      '@const': resolve(root, 'const'),
      '@type': resolve(root, 'types'),
      '@components': resolve(root, 'components'),
      '@pages': resolve(root, 'pages'),
      '@hooks': resolve(root, 'hooks'),
      '@utils': resolve(root, 'utils'),
      '@assets': resolve(root, 'assets'),
      '@store': resolve(root, 'store'),
      '@services': resolve(root, 'services'),
      '@thunks': resolve(root, 'thunks'),
    }
  }
});
