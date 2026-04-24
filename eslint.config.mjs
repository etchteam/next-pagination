import nextjs from '@etchteam/eslint-config/nextjs'
import globals from 'globals'

export default [
  {
    ignores: [
      'dist/**',
      'example/.next/**',
      'example/build/**',
      '**/*.{yml,yaml}'
    ]
  },
  ...nextjs,
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node
    }
  },
  {
    files: ['example/next.config.mjs'],
    languageOptions: {
      globals: globals.node
    }
  }
]
