import type { Theme } from './Theme';

/**
 * The ONLY place raw color literals are allowed (ESLint exempts src/theme).
 * Values are verbatim from docs/theme.md — do not invent colors elsewhere.
 */

/** Bold Orange — light, default. Signature: the big orange dashboard hero. */
export const bold: Theme = {
  mode: 'bold',
  bg: '#FBFAF7',
  bgAlt: '#F3F0EA',
  surface: '#FFFFFF',
  surfaceAlt: '#F8F5EF',
  ink: '#1C1A18',
  sub: '#857D74',
  faint: 'rgba(28,26,24,0.07)',
  hairline: 'rgba(28,26,24,0.09)',
  primary: '#D85C32',
  primaryDeep: '#BC4A24',
  primarySoft: '#FBE2D5',
  onPrimary: '#FFFFFF',
  income: '#3E8E4F',
  incomeSoft: '#E4F0E2',
  expense: '#1C1A18',
  navBg: '#FFFFFF',
  heroBg: '#D85C32',
  heroInk: '#FFFFFF',
  heroSub: 'rgba(255,255,255,0.78)',
  chipBg: '#F2ECE3',
  statusBarIcons: 'dark',
};

/** Warm Dark — dark-mode counterpart. Hero becomes a raised dark surface. */
export const dark: Theme = {
  mode: 'dark',
  bg: '#1A1613',
  bgAlt: '#211C18',
  surface: '#262019',
  surfaceAlt: '#2D261F',
  ink: '#F4ECE2',
  sub: '#A89C8E',
  faint: 'rgba(244,236,226,0.08)',
  hairline: 'rgba(244,236,226,0.10)',
  primary: '#E08A5E',
  primaryDeep: '#C9744A',
  primarySoft: '#3A2A20',
  onPrimary: '#1A1613',
  income: '#7CB97E',
  incomeSoft: 'rgba(38,48,36,0.25)',
  expense: '#F4ECE2',
  navBg: '#211C18',
  heroBg: '#2D261F',
  heroInk: '#F4ECE2',
  heroSub: '#A89C8E',
  chipBg: '#2D261F',
  statusBarIcons: 'light',
};

export const THEMES: Record<Theme['mode'], Theme> = { bold, dark };
