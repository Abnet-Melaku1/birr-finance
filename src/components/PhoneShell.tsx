import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

import { StatusBar } from './StatusBar';

export interface PhoneShellProps {
  children: ReactNode;
}

export function PhoneShell({ children }: PhoneShellProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <StatusBar />
      {children}
    </View>
  );
}
