/**
 * Theme contract — two themes, ONE UI (CLAUDE.md §1–§2, docs/theme.md).
 * Only color tokens differ between Bold Orange (light, default) and Warm Dark;
 * layout/spacing/shape never diverge. Components must read every color from a
 * `Theme` via `useTheme()` — never hardcode a hex (enforced by ESLint).
 */
export type ThemeMode = 'bold' | 'dark';

/** How the user wants the theme resolved: follow the OS, or force one. */
export type ThemePref = 'system' | 'bold' | 'dark';

export interface Theme {
  mode: ThemeMode;

  // Surfaces
  bg: string;
  bgAlt: string;
  surface: string;
  surfaceAlt: string;

  // Text
  ink: string;
  sub: string;

  // Lines
  faint: string; // dividers / progress track
  hairline: string; // card borders (dark theme)

  // Brand
  primary: string;
  primaryDeep: string; // pressed
  primarySoft: string; // active-nav pill bg, soft fills
  onPrimary: string;

  // Money semantics
  income: string; // positive amounts (green)
  incomeSoft: string;
  expense: string; // negative amounts = ink (NOT red)

  // Navigation
  navBg: string;

  // Dashboard hero (orange block in bold, raised dark surface in dark)
  heroBg: string;
  heroInk: string;
  heroSub: string;

  // Misc
  chipBg: string;
  statusBarIcons: 'dark' | 'light';
}
