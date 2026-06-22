import type { Theme } from './Theme';

/** Soft shadow in light; 1px hairline border (no shadow) in dark. */
export function cardElevation(theme: Theme) {
  if (theme.mode === 'dark') {
    return { borderWidth: 1, borderColor: theme.hairline };
  }
  return {
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  };
}

/** Orange glow under the raised FAB. */
export function fabElevation(theme: Theme) {
  return {
    shadowColor: theme.primary,
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  };
}
