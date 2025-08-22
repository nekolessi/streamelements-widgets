import { defineConfig } from 'vite';

// Library mode: builds src/widget.js into dist/ without needing index.html
export default defineConfig({
  build: {
    lib: {
      entry: 'src/widget.js',
      name: 'ChatBubbles',
      formats: ['iife'], // self-executing for browser drop-in
      fileName: () => 'chat-bubbles.js'
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // external: [], // add externals if you don't want them bundled
    }
  }
});
