import { Pressable } from 'react-native';

import { radii, useTheme } from '@/theme';

import { AppText } from './AppText';

export interface PillProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export function Pill({ label, active = false, onPress }: PillProps) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={({ pressed }) => ({
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: radii.pill,
        backgroundColor: active ? t.primarySoft : t.chipBg,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <AppText variant="caption" color={active ? t.primary : t.sub}>
        {label}
      </AppText>
    </Pressable>
  );
}
