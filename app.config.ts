import type { ExpoConfig } from 'expo/config';

/**
 * Expo app config (TS form so the Android SMS config plugin can attach in
 * Phase 8). Mirrors the product spec: Android-only SMS permissions, automatic
 * (system) dark mode, expo-router for navigation, expo-sqlite for on-device
 * persistence, and a custom dev client (SMS can't run under Expo Go).
 */
const config: ExpoConfig = {
  name: 'Birr',
  slug: 'birr-finance',
  scheme: 'birr',
  version: '0.1.0',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  android: {
    package: 'com.marketpal.birr',
    permissions: ['RECEIVE_SMS', 'READ_SMS'],
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.marketpal.birr',
  },
  plugins: ['expo-router', 'expo-font', 'expo-sqlite', 'expo-dev-client'],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
