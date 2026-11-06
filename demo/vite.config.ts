import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rolldownOptions: {
      checks: {
        // lottie-web ships an expression engine that calls `eval` at runtime.
        // The diagnostic refers to that third-party code, not this app.
        eval: false,
      },
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
});
