import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          utils: ['xlsx']
        }
      }
    }
  },
  server: {
    host: true,
    open: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname), // now '@' points to project root
    },
  },
})