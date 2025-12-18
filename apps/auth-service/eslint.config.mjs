import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default [
  // Base JS (equivalente ao node)
  js.configs.recommended,

  // TypeScript (equivalente ao Rocketseat)
  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module'
      }
    },
    rules: {
      // equivalente ao seu override
      'no-useless-constructor': 'off',

      // boas práticas que a Rocketseat usa
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/consistent-type-imports': 'error'
    }
  },
  {
    ignores: ['dist/**', 'node_modules/**']
  }
]
