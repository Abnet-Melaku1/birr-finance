import { Text, type TextProps } from 'react-native';

import { type as presets, useTheme } from '@/theme';

type Variant = keyof typeof presets;

export interface AppTextProps extends TextProps {
  variant?: Variant;
  /** Resolved theme color; defaults to `ink`. */
  color?: string;
}

export function AppText({ variant = 'body', color, style, ...rest }: AppTextProps) {
  const t = useTheme();
  return <Text {...rest} style={[presets[variant], { color: color ?? t.ink }, style]} />;
}
