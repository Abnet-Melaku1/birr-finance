import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useTheme } from '@/theme';

import { AppText } from './AppText';

export interface PillProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export function Pill({ label, active = false, onPress }: PillProps) {
  const t = useTheme();
  styles.useVariants({ active });
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={({ pressed }) => [styles.pill, pressed && styles.pressed]}
    >
      <AppText variant="caption" color={active ? t.primary : t.sub}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.radii.pill,
    variants: {
      active: {
        true: { backgroundColor: theme.primarySoft },
        false: { backgroundColor: theme.chipBg },
      },
    },
  },
  pressed: { opacity: 0.7 },
}));
