// eslint.config.js (flat config for ESLint v9+)
import js from "@eslint/js";
import globals from "globals";
import pluginImport from "eslint-plugin-import";

export default [
  {
    ignores: ["node_modules/**", "dist/**", "build/**", "coverage/**", "docs/**"],
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: pluginImport,
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-undef": "error",
      "import/order": ["warn", { alphabetize: { order: "asc", caseInsensitive: true } }]
    },
  },
];
