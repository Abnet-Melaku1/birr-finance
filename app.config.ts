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
  owner: 'abnetm',
  scheme: 'birr',
  version: '0.1.0',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  extra: {
    eas: {
      projectId: '51ac0ebc-5a22-429f-9219-6744ab50d5d4',
    },
  },
  android: {
    package: 'com.birrfinance.app',
    // SMS permissions are intentionally omitted for now so the dev build
    // sideloads without the Play Protect "sensitive permissions" block. They
    // are re-added together with the native SMS receiver module.
    blockedPermissions: ['android.permission.RECEIVE_SMS', 'android.permission.READ_SMS'],
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.birrfinance.app',
  },
  plugins: ['expo-router', 'expo-font', 'expo-sqlite', 'expo-dev-client'],
};

export default config;
