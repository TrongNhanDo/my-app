import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://trongnhando.github.io/childrenToy-ui/',
  plugins: [react()],
  server: {
    port: 3000,
  },
});
