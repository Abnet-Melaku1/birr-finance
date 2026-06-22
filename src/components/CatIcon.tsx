import { View } from 'react-native';

import { tint } from '@/lib/money';
import { radii, useTheme } from '@/theme';

import { Icon, type IconName } from './Icon';

export interface CatIconProps {
  name: IconName;
  /** Category color. */
  color: string;
  size?: number;
}

export function CatIcon({ name, color, size = 40 }: CatIconProps) {
  const t = useTheme();
  const bg = tint(color, t.surface, t.mode === 'dark' ? 26 : 15);
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radii.tile,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name={name} color={color} size={size * 0.5} />
    </View>
  );
}
