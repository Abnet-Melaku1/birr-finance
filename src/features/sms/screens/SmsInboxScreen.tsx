import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

import { AppText, PhoneShell, ScreenHeader } from '@/components';
import { space } from '@/theme';

export function SmsInboxScreen() {
  const router = useRouter();
  return (
    <PhoneShell>
      <ScreenHeader
        title="SMS Inbox"
        subtitle="Auto-parsed from your banks"
        onBack={() => router.back()}
      />
      <ScrollView
        contentContainerStyle={{ padding: space.screenX, paddingBottom: space.scrollBottom }}
      >
        <AppText>SMS Inbox</AppText>
      </ScrollView>
    </PhoneShell>
  );
}
