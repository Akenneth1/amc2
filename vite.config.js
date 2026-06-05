import { defineConfig } from 'vite';

export default defineConfig({
  // 'base' configuré avec le nom de votre repo GitHub pour que 
  // les liens (CSS, JS, Images) fonctionnent sur GitHub Pages.
  base: '/amc2/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});
