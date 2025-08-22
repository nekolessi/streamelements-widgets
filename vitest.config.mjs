import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node', // change to 'jsdom' if testing DOM/browser code
    include: ['tests/**/*.test.{js,jsx,ts,tsx}'],
    globals: true
  },
});
