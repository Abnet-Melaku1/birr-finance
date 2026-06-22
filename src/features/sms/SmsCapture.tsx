import { useSmsCapture } from './useSmsCapture';

/** Mounts the on-device SMS capture pipeline. Renders nothing. */
export function SmsCapture() {
  useSmsCapture();
  return null;
}
