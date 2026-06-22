import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

import { AppText, PhoneShell, ScreenHeader } from '@/components';
import { space } from '@/theme';

export function SettingsScreen() {
  const router = useRouter();
  return (
    <PhoneShell>
      <ScreenHeader title="Settings" subtitle="Theme & accounts" onBack={() => router.back()} />
      <ScrollView
        contentContainerStyle={{ padding: space.screenX, paddingBottom: space.scrollBottom }}
      >
        <AppText>Settings</AppText>
      </ScrollView>
    </PhoneShell>
  );
}
