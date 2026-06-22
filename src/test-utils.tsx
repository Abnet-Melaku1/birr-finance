import { render, type RenderOptions } from '@testing-library/react-native';
import type { ReactElement, ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, type ThemePref } from '@/theme';

const METRICS = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

function Providers({ children, pref }: { children: ReactNode; pref?: ThemePref }) {
  return (
    <SafeAreaProvider initialMetrics={METRICS}>
      <ThemeProvider initialPref={pref ?? 'bold'}>{children}</ThemeProvider>
    </SafeAreaProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  opts: { pref?: ThemePref } & Omit<RenderOptions, 'wrapper'> = {},
) {
  const { pref, ...rest } = opts;
  return render(ui, {
    wrapper: ({ children }) => <Providers pref={pref}>{children}</Providers>,
    ...rest,
  });
}
