import { defineConfig } from 'vite';

export default defineConfig({
  // 'base' configuré en relatif './' pour que le site fonctionne 
  // quel que soit le nom du repo GitHub (ex: github.io/AMC-site-web/)
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Assure que les fichiers HTML dans src/pages sont inclus dans le build
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
