import { useTheme, useThemePref } from '@/theme';

import { IconBtn } from './IconBtn';

export function ThemeToggle() {
  const t = useTheme();
  const { setPref } = useThemePref();
  const isDark = t.mode === 'dark';
  return (
    <IconBtn
      name={isDark ? 'moon' : 'sun'}
      accessibilityLabel="Toggle theme"
      size={38}
      onPress={() => setPref(isDark ? 'bold' : 'dark')}
    />
  );
}
