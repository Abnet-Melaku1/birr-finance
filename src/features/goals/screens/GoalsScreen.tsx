import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

import { AppText, PhoneShell, ScreenHeader } from '@/components';
import { space } from '@/theme';

export function GoalsScreen() {
  const router = useRouter();
  return (
    <PhoneShell>
      <ScreenHeader title="Goals" subtitle="Savings targets" onBack={() => router.back()} />
      <ScrollView
        contentContainerStyle={{ padding: space.screenX, paddingBottom: space.scrollBottom }}
      >
        <AppText>Goals</AppText>
      </ScrollView>
    </PhoneShell>
  );
}
