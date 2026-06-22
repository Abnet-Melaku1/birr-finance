import { View } from 'react-native';

import { tint } from '@/lib/money';
import { radii, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface MonogramProps {
  /** Single-character bank initial. */
  label: string;
  /** Bank brand color. */
  color: string;
  size?: number;
}

export function Monogram({ label, color, size = 40 }: MonogramProps) {
  const t = useTheme();
  const bg = tint(color, t.surface, t.mode === 'dark' ? 26 : 15);
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radii.monogram,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AppText variant="cardTitle" color={color}>
        {label.charAt(0).toUpperCase()}
      </AppText>
    </View>
  );
}
