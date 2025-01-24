import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true, // Hoặc sử dụng '0.0.0.0' để cho phép mọi thiết bị trong mạng truy cập
    port: 5173, // Port mặc định, bạn có thể thay đổi nếu cần
  },
});
