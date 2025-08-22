import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    plugins: { import: pluginImport },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'import/order': ['warn', { 'newlines-between': 'always' }],
      'curly': ['error', 'all'],
      'no-console': ['warn', { allow: ['warn', 'error'] }]
    },
  },
  {
    files: ['vitest.config.mjs'],
    rules: {
      'import/no-unresolved': 'off'
    }
  }
];
