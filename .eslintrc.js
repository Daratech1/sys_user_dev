module.exports = {
  parser: "babel-eslint",
  env: {
    es6: false,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react"],
  extends: [
    // "eslint:recommended",
    // "plugin:react/recommended"
  ],
};
