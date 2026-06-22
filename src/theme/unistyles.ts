import { StyleSheet } from 'react-native-unistyles';

import { radii, space } from './shape';
import { bold, dark } from './tokens';
import { fonts, type } from './typography';

// Shape/typography are theme-independent; fold them into each theme so
// StyleSheet.create((theme) => …) can read tokens, radii, and type in one place.
const shared = { radii, space, fonts, type };

// Bold Orange is registered under `light` so Unistyles adaptive (system) theming
// picks it for light mode; its `mode` field stays 'bold' for the hero/elevation logic.
export const appThemes = {
  light: { ...bold, ...shared },
  dark: { ...dark, ...shared },
};

export type AppTheme = (typeof appThemes)['light'];

type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: appThemes,
  settings: { adaptiveThemes: true },
});
