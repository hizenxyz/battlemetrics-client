const js = require("@eslint/js");
const tseslint = require("typescript-eslint");

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json", // Add this line
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      // Remove the problematic rule for now
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      // "@typescript-eslint/prefer-readonly": "error", // Comment out this line
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: "error",
    },
  },
  {
    files: ["tests/**/*.ts", "**/*.test.ts", "**/*.spec.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
  {
    ignores: [
      "dist/",
      "node_modules/",
      "coverage/",
      "*.config.js",
      "commitlint.config.js",
      "eslint.config.js",
      "prettier.config.js",
      "vitest.config.ts",
    ],
  },
];
