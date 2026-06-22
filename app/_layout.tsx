import { Stack } from 'expo-router';

/**
 * Root navigator. Phase 3 wraps this in ThemeProvider + a font gate and adds
 * the tab group / secondary routes / modal sheets. For now it's a bare stack so
 * the app boots on the expo-router entry.
 */
export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
