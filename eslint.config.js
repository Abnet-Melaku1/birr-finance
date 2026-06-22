// Flat config (ESLint 9). Extends Expo's flat preset, then layers our
// design-system + TypeScript guard rules. Color literals are banned outside
// src/theme (CLAUDE.md §10 / docs/theme.md).
const expoConfig = require('eslint-config-expo/flat');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  ...expoConfig,
  eslintConfigPrettier,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [{ pattern: '@/**', group: 'internal' }],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      // Guard the design system: no raw hex/rgb/hsl colors — use useTheme() tokens.
      'no-restricted-syntax': [
        'warn',
        {
          selector:
            'Literal[value=/^#(?:[0-9a-fA-F]{3,4}){1,2}$/], Literal[value=/^(rgb|rgba|hsl|hsla)\\(/]',
          message: 'No hardcoded colors. Use a theme token from useTheme().',
        },
      ],
    },
  },
  {
    // Theme tokens are the single source of truth for color literals.
    files: ['src/theme/**'],
    rules: { 'no-restricted-syntax': 'off' },
  },
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'dist/**',
      'android/**',
      'ios/**',
      'babel.config.js',
      'eslint.config.js',
      'metro.config.js',
    ],
  },
];
