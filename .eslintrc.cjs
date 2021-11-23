module.exports = {
  root: true,
  parserOptions: {
    sourceType: "module",
  },
  plugins: ["jest"],
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "prettier",
  ],
  rules: {
    "no-console": [
      "warn",
      {
        allow: ["warn", "error", "info"],
      },
    ],
    "no-debugger": "warn",
  },
  env: {
    node: true,
    es6: true,
    "jest/globals": true,
  },
};
