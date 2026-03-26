import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
   base: process.env.NODE_ENV === 'production' ? '/studio/' : '/',
   plugins: [
      tanstackRouter({
         target: 'react',
         autoCodeSplitting: true,
      }),
      tailwindcss(),
      react(),
   ] as any,
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
         '@shared': path.resolve(__dirname, '../shared/src'),
         '@server': path.resolve(__dirname, '../server/src'),
      },
   },
   server: {
      proxy: {
         '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
         },
      },
   },
   define: {
      'process.env': {},
   },
});
