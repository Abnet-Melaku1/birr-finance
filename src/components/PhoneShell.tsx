import type { ReactNode } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { StatusBar } from './StatusBar';

export interface PhoneShellProps {
  children: ReactNode;
}

export function PhoneShell({ children }: PhoneShellProps) {
  return (
    <View style={styles.shell}>
      <StatusBar />
      {children}
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  shell: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingTop: rt.insets.top,
  },
}));
