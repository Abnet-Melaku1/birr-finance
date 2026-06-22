import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { useTheme } from '@/theme';

export function StatusBar() {
  const t = useTheme();
  return <ExpoStatusBar style={t.statusBarIcons} />;
}
