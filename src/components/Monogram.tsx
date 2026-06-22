import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { tint } from '@/lib/money';

import { AppText } from './AppText';

export interface MonogramProps {
  /** Single-character bank initial. */
  label: string;
  /** Bank brand color. */
  color: string;
  size?: number;
}

export function Monogram({ label, color, size = 40 }: MonogramProps) {
  return (
    <View style={styles.tile(color, size)}>
      <AppText variant="cardTitle" color={color}>
        {label.charAt(0).toUpperCase()}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  tile: (color: string, size: number) => ({
    width: size,
    height: size,
    borderRadius: theme.radii.monogram,
    backgroundColor: tint(color, theme.surface, theme.mode === 'dark' ? 26 : 15),
    alignItems: 'center',
    justifyContent: 'center',
  }),
}));
