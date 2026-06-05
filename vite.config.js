import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Plugin custom : copie src/pages/*.html dans dist/src/pages/
function copyPagesPlugin() {
  return {
    name: 'copy-pages',
    closeBundle() {
      const srcDir = resolve(__dirname, 'src/pages');
      const destDir = resolve(__dirname, 'dist/src/pages');
      
      if (!fs.existsSync(srcDir)) return;
      
      fs.mkdirSync(destDir, { recursive: true });
      fs.readdirSync(srcDir).forEach(file => {
        if (file.endsWith('.html')) {
          fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
        }
      });
      console.log('✓ Pages HTML copiées dans dist/src/pages/');
    }
  };
}

export default defineConfig({
  // 'base' configuré avec le nom de votre repo GitHub pour que 
  // les liens (CSS, JS, Images) fonctionnent sur GitHub Pages.
  base: '/amc2/',
  plugins: [copyPagesPlugin()],
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
