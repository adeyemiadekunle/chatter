module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'no-console': 'error',
    'no-unused-vars': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
  },
};
