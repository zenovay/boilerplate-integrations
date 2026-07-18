import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/.next/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/.svelte-kit/**',
      '**/.astro/**',
      '**/node_modules/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        console: 'readonly',
        URL: 'readonly',
      },
    },
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,mts}'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
)
