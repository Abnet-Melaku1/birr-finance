import type { Theme, ThemePref } from './Theme';
import { useThemeContext } from './ThemeProvider';

/** The active theme. Every color in the app flows from here. */
export function useTheme(): Theme {
  return useThemeContext().theme;
}

/** The theme preference + setter (for the Settings toggle). */
export function useThemePref(): { pref: ThemePref; setPref: (pref: ThemePref) => void } {
  const { pref, setPref } = useThemeContext();
  return { pref, setPref };
}
