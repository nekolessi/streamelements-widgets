import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Use 'jsdom' if you're testing DOM/browser code
    environment: 'node',
    // Uncomment if you want success even when no tests are present
    // passWithNoTests: true,
    include: ['tests/**/*.test.{js,jsx,ts,tsx}'],
    globals: true
  },
});
