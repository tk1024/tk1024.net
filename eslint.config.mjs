import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals'],
    rules: {
      'react-compiler/react-compiler': 'error'
    },
    plugins: [
      'react-compiler'
    ]
  }),
]

export default eslintConfig
