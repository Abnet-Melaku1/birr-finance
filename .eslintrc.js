// .eslintrc.js — drop at repo root
module.exports = {
  root: true,
  extends: [
    'expo',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  settings: {
    'import/resolver': {
      typescript: { project: './tsconfig.json' },
    },
  },
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
    // Guard the design system: no raw hex/rgb colors in components & features —
    // colors must come from useTheme() tokens. (CLAUDE.md §10 / docs/theme.md)
    'no-restricted-syntax': [
      'warn',
      {
        selector:
          "Literal[value=/^#(?:[0-9a-fA-F]{3,4}){1,2}$/], Literal[value=/^(rgb|rgba|hsl|hsla)\\(/]",
        message:
          'No hardcoded colors in components/features. Use a theme token from useTheme().',
      },
    ],
  },
  overrides: [
    {
      // tokens are allowed to contain literal colors
      files: ['src/theme/**'],
      rules: { 'no-restricted-syntax': 'off' },
    },
  ],
};
