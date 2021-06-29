module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "eslint-config-prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
