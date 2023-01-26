'use strict';

module.exports = {
  extends: [
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['prettier', 'react', 'react-hooks', 'jsx-a11y', 'lodash'],

  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.tsx', '.jsx'] }],
    'lodash/import-scope': [2, 'method'],
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
    'react/display-name': 0,
    'jsx-a11y/no-autofocus': 0,
    'no-unused-vars': [
      2,
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    'no-unused-expressions': [
      2,
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-console': [1, { allow: ['error'] }],
    'max-lines': ['error', 400],
    'import/no-default-export': 'warn',
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        quoteProps: 'consistent',
        printWidth: 100,
        tabWidth: 2,
      },
      { usePrettierrc: false },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: './',
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },

        warnOnUnsupportedTypeScriptVersion: true,
      },
      plugins: ['@typescript-eslint'],

      rules: {
        '@typescript-eslint/ban-ts-comment': 2,
        '@typescript-eslint/no-non-null-assertion': 2,
        '@typescript-eslint/no-unnecessary-type-assertion': 2,
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': [
          2,
          {
            args: 'none',
            ignoreRestSiblings: true,
          },
        ],
        'no-unused-expressions': 0,
        '@typescript-eslint/no-unused-expressions': [
          2,
          {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
          },
        ],
        '@typescript-eslint/consistent-type-assertions': [
          2,
          {
            assertionStyle: 'never',
          },
        ],
      },
    },
  ],
};
