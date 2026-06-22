import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import type { Theme, ThemePref } from './Theme';
import { THEMES } from './tokens';

interface ThemeContextValue {
  theme: Theme;
  pref: ThemePref;
  setPref: (pref: ThemePref) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Pure resolver: turn the user preference + OS color scheme into a concrete
 * Theme. Kept separate so it's unit-testable without React.
 */
/** The OS color scheme as reported by RN's `useColorScheme()`, widened to
 * cover the `null`/`undefined` it can return before the scheme is known. */
type Scheme = 'light' | 'dark' | 'unspecified' | null | undefined;

export function resolveTheme(pref: ThemePref, scheme: Scheme): Theme {
  if (pref === 'bold') return THEMES.bold;
  if (pref === 'dark') return THEMES.dark;
  return scheme === 'dark' ? THEMES.dark : THEMES.bold;
}

interface ThemeProviderProps {
  children: ReactNode;
  /** Starting preference (persisted pref is injected here once wired). */
  initialPref?: ThemePref;
}

export function ThemeProvider({ children, initialPref = 'system' }: ThemeProviderProps) {
  const scheme = useColorScheme();
  const [pref, setPref] = useState<ThemePref>(initialPref);
  const theme = useMemo(() => resolveTheme(pref, scheme), [pref, scheme]);
  const value = useMemo<ThemeContextValue>(() => ({ theme, pref, setPref }), [theme, pref]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme/useThemePref must be used within a <ThemeProvider>.');
  }
  return ctx;
}
