import { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';

import { clamp } from '@/lib/money';
import { radii, useTheme } from '@/theme';

export interface ProgressBarProps {
  /** Usage ratio; > 1 means over budget (fill switches to `primary`). */
  ratio: number;
  /** Fill color when not over budget; defaults to ink. */
  color?: string;
  height?: number;
  animate?: boolean;
}

export function ProgressBar({ ratio, color, height = 8, animate = true }: ProgressBarProps) {
  const t = useTheme();
  const over = ratio > 1;
  const target = clamp(ratio, 0, 1);

  const [anim] = useState(() => new Animated.Value(animate ? 0 : target));
  useEffect(() => {
    if (!animate) {
      anim.setValue(target);
      return;
    }
    Animated.timing(anim, { toValue: target, duration: 500, useNativeDriver: false }).start();
  }, [anim, target, animate]);

  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View
      style={{
        height,
        borderRadius: radii.pill,
        backgroundColor: t.faint,
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={{
          width,
          height: '100%',
          borderRadius: radii.pill,
          backgroundColor: over ? t.primary : (color ?? t.ink),
        }}
      />
    </View>
  );
}
