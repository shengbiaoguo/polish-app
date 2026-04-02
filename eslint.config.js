import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'

export default [
  {
    ignores: ['dist', 'node_modules'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      'unused-imports': unusedImports,
    },

    rules: {
      // React Hooks
      ...reactHooks.configs.recommended.rules,

      'unused-imports/no-unused-imports': 'error',

      // 🚨 关键：关掉这个（刚才报错的来源）
      'react-refresh/only-export-components': 'off',

      // 通用规则
      'no-console': 'warn',

      '@typescript-eslint/no-unused-vars': ['warn'],

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal'],
        },
      ],
    },
  },
]