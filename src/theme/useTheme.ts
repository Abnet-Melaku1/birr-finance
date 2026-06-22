import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles';

import type { ThemePref } from './Theme';
import type { AppTheme } from './unistyles';

/** The active theme (colors + radii + space + fonts + type). */
export function useTheme(): AppTheme {
  return useUnistyles().theme;
}

/** Theme preference + setter for the Settings toggle (system | bold | dark). */
export function useThemePref(): { pref: ThemePref; setPref: (pref: ThemePref) => void } {
  useUnistyles(); // subscribe so the toggle re-renders on change

  const pref: ThemePref = UnistylesRuntime.hasAdaptiveThemes
    ? 'system'
    : UnistylesRuntime.themeName === 'dark'
      ? 'dark'
      : 'bold';

  const setPref = (next: ThemePref) => {
    if (next === 'system') {
      UnistylesRuntime.setAdaptiveThemes(true);
      return;
    }
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(next === 'dark' ? 'dark' : 'light');
  };

  return { pref, setPref };
}
