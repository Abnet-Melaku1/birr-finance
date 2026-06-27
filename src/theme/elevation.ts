import type { Theme } from './Theme';

/** Soft shadow in light; 1px hairline border (no shadow) in dark. */
export function cardElevation(theme: Theme) {
  if (theme.mode === 'dark') {
    return { borderWidth: 1, borderColor: theme.hairline };
  }
  // Fabric boxShadow (not shadow*/elevation, which renders torn edges on Android).
  return {
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.04), 0px 6px 16px rgba(0, 0, 0, 0.03)',
  };
}

/** Orange glow under the raised FAB. */
export function fabElevation(theme: Theme) {
  // `59` ≈ 35% alpha — FAB glow per CLAUDE.md §2.4 (0 8px 20px primary@35%).
  return { boxShadow: `0px 8px 20px ${theme.primary}59` };
}
