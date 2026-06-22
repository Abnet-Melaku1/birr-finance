import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { cardElevation, radii, space, useTheme } from '@/theme';

export interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
}

export function Card({ children, style, padded = true }: CardProps) {
  const t = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: t.surface,
          borderRadius: radii.card,
          padding: padded ? space.card : 0,
        },
        cardElevation(t),
        style,
      ]}
    >
      {children}
    </View>
  );
}
