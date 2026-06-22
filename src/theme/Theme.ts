export type ThemeMode = 'bold' | 'dark';
export type ThemePref = 'system' | 'bold' | 'dark';

export interface Theme {
  mode: ThemeMode;

  bg: string;
  bgAlt: string;
  surface: string;
  surfaceAlt: string;

  ink: string;
  sub: string;

  faint: string; // dividers / progress track
  hairline: string; // card borders (dark theme)

  primary: string;
  primaryDeep: string;
  primarySoft: string;
  onPrimary: string;

  income: string;
  incomeSoft: string;
  expense: string; // = ink, never red

  navBg: string;

  heroBg: string; // orange in bold, raised dark surface in dark
  heroInk: string;
  heroSub: string;

  chipBg: string;
  statusBarIcons: 'dark' | 'light';
}
