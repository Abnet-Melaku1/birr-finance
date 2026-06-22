import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { tint } from '@/lib/money';

import { Icon, type IconName } from './Icon';

export interface CatIconProps {
  name: IconName;
  /** Category color. */
  color: string;
  size?: number;
}

export function CatIcon({ name, color, size = 40 }: CatIconProps) {
  return (
    <View style={styles.tile(color, size)}>
      <Icon name={name} color={color} size={size * 0.5} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  tile: (color: string, size: number) => ({
    width: size,
    height: size,
    borderRadius: theme.radii.tile,
    backgroundColor: tint(color, theme.surface, theme.mode === 'dark' ? 26 : 15),
    alignItems: 'center',
    justifyContent: 'center',
  }),
}));
