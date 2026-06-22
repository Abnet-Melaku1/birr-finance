import type { ViewStyle } from 'react-native';

import type { Theme } from './Theme';

/**
 * Elevation rule (CLAUDE.md §2.4): light theme uses soft shadows; dark theme
 * uses a 1px hairline border and NO shadow. Centralized here so no component
 * re-implements the switch.
 */
export function cardElevation(theme: Theme): ViewStyle {
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

/** Orange glow under the raised FAB (both themes). */
export function fabElevation(theme: Theme): ViewStyle {
  return {
    shadowColor: theme.primary,
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  };
}
