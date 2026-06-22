import type { TextStyle } from 'react-native';

/**
 * Typography (CLAUDE.md §2.3, docs/theme.md). UI font is Plus Jakarta Sans;
 * Space Mono is used ONLY for the raw SMS block. Family names match the keys
 * loaded via @expo-google-fonts (see the font gate in app/_layout.tsx).
 */
export const fonts = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
  mono: 'SpaceMono_400Regular',
} as const;

/**
 * Named type presets (size/weight from the §2.3 scale). Color is applied by the
 * consumer from a theme token — presets never carry color.
 */
export const type = {
  heroBalance: { fontFamily: fonts.extrabold, fontSize: 38, letterSpacing: -0.2 },
  screenTitle: { fontFamily: fonts.extrabold, fontSize: 19 },
  sectionLabel: { fontFamily: fonts.extrabold, fontSize: 15.5 },
  cardTitle: { fontFamily: fonts.bold, fontSize: 14 },
  body: { fontFamily: fonts.semibold, fontSize: 13 },
  secondary: { fontFamily: fonts.medium, fontSize: 12.5 },
  caption: { fontFamily: fonts.semibold, fontSize: 11.5 },
  micro: { fontFamily: fonts.extrabold, fontSize: 10 },
  mono: { fontFamily: fonts.mono, fontSize: 11 },
} satisfies Record<string, TextStyle>;

/** Money rendering: tabular figures + tight tracking (CLAUDE.md §2.3). */
export const moneyText: TextStyle = {
  fontVariant: ['tabular-nums'],
  letterSpacing: -0.2,
};
