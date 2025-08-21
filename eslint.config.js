// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import pluginImport from "eslint-plugin-import";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "coverage/",
      ".turbo/",
      "**/*.min.*",
      "packages/*/dist/",
      "packages/*/build/",
    ],
  },
  {
    name: "base",
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      import: pluginImport,
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".mjs", ".cjs", ".jsx", ".json"],
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/newline-after-import": "warn",
      "import/no-unresolved": [
        "error",
        { ignore: ["\\.(css|scss|sass|less|svg|png|jpg|jpeg|gif|webp)$"] },
      ],
      "import/no-extraneous-dependencies": [
        "error",
        {
          packageDir: ["./", "./packages/*"],
        },
      ],
    },
  },
  {
    name: "tests",
    files: [
      "**/*.test.*",
      "**/*.spec.*",
      "**/__tests__/**",
      "tests/**",
    ],
    languageOptions: {
      globals: {
        ...globals.vitest,
        ...globals.jest,
      },
    },
    rules: {
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          packageDir: ["./", "./packages/*"],
        },
      ],
    },
  },
  {
    name: "node-scripts",
    files: ["scripts/**", "**/*.config.{js,cjs,mjs}"],
    languageOptions: {
      globals: globals.node,
    },
  },
];
