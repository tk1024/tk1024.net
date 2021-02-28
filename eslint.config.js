const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.config({
    extends: ['next/core-web-vitals'],
    rules: {
      'react-compiler/react-compiler': 'error'
    },
    plugins: [
      'react-compiler'
    ]
  }),
];
