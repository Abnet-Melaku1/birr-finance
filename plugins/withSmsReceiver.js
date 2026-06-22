const { withAndroidManifest } = require('expo/config-plugins');

const PERMISSIONS = ['android.permission.RECEIVE_SMS', 'android.permission.READ_SMS'];

/**
 * Ensures the Android SMS permissions and is the home for the on-device SMS
 * BroadcastReceiver. Live capture needs a small native module (Kotlin) emitting
 * an 'onSms' event, added in a custom dev build (not Expo Go); this plugin keeps
 * the manifest ready for it. The JS side (SmsListener) no-ops until it's present.
 */
function withSmsReceiver(config) {
  return withAndroidManifest(config, (cfg) => {
    const manifest = cfg.modResults.manifest;
    manifest['uses-permission'] = manifest['uses-permission'] || [];
    for (const name of PERMISSIONS) {
      const exists = manifest['uses-permission'].some(
        (p) => p.$ && p.$['android:name'] === name,
      );
      if (!exists) {
        manifest['uses-permission'].push({ $: { 'android:name': name } });
      }
    }
    return cfg;
  });
}

module.exports = withSmsReceiver;
