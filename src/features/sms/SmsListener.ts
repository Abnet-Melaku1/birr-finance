import { requireOptionalNativeModule } from 'expo-modules-core';
import { PermissionsAndroid, Platform } from 'react-native';

export interface SmsEvent {
  sender: string;
  body: string;
}

export type SmsHandler = (event: SmsEvent) => void;

interface NativeSmsModule {
  addListener(event: 'onSms', handler: SmsHandler): { remove(): void };
}

// Present only in an Android dev build that includes the native receiver
// (registered by plugins/withSmsReceiver). Absent under Expo Go, iOS, web,
// and tests — in which case capture is a safe no-op.
function nativeModule(): NativeSmsModule | null {
  if (Platform.OS !== 'android') return null;
  return requireOptionalNativeModule<NativeSmsModule>('BirrSmsReceiver') ?? null;
}

export function subscribeToSms(handler: SmsHandler): () => void {
  const native = nativeModule();
  if (!native) return () => {};
  const sub = native.addListener('onSms', handler);
  return () => sub.remove();
}

/** Android runtime permission with an on-device rationale. */
export async function requestSmsPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return false;
  const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, {
    title: 'Read transaction SMS',
    message:
      'Birr reads bank and wallet SMS on your phone to auto-file transactions. ' +
      'Messages are processed on-device and never leave your phone.',
    buttonPositive: 'Allow',
    buttonNegative: 'Not now',
  });
  return result === PermissionsAndroid.RESULTS.GRANTED;
}
