module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: [
    'dist',
  ],
  rules: {
    semi: ['error', 'always'],
    'import/no-unresolved': 'off',
    'no-unused-expressions': ['error', { allowTernary: true }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
