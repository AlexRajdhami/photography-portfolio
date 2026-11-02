/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site from /photography-portfolio/
export default defineConfig({
  base: process.env.BASE_PATH ?? '/photography-portfolio/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: false,
  },
});
