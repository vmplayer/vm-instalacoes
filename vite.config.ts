import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        solucoes: resolve(__dirname, 'src/pages/solucoes.html'),
        conhecaTecnico: resolve(__dirname, 'src/pages/conheca-o-tecnico.html')
      }
    }
  }
});
