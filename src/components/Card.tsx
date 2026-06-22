import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { cardElevation } from '@/theme';

export interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
}

export function Card({ children, style, padded = true }: CardProps) {
  styles.useVariants({ padded });
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.surface,
    borderRadius: theme.radii.card,
    ...cardElevation(theme),
    variants: {
      padded: {
        true: { padding: theme.space.card },
        false: { padding: 0 },
      },
    },
  },
}));
