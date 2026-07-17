import { defineConfig } from 'vite';

export default defineConfig({
  // index.html ya está en la raíz, Vite lo detecta automáticamente
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
