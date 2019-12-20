module.exports = {
  plugins: ['@typescript-eslint', 'import', 'react-hooks', 'prettier'],
  extends: ['plugin:react/recommended', 'plugin:import/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-console': [2, { allow: ['error'] }],
    'prettier/prettier': 2,
    'import/imports-first': 2,
    'import/first': 2,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 0,
    'react/prop-types': 0,
    'import/no-named-as-default': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': [2, { 'ts-ignore': 'allow-with-description', minimumDescriptionLength: 10 }],
    '@typescript-eslint/no-explicit-any': 0,
  },
  overrides: [
    {
      files: ['**/*.spec.js', '**/*.spec.jsx', 'jest.config.js'],
      rules: {
        'import/imports-first': 0,
        'import/first': 0,
        'import/order': 0,
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.js'],
    },
    'import/resolver': {
      node: {},
      typescript: {
        project: './',
      },
    },
  },
}
