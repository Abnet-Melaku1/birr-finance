import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

import { AppText, PhoneShell, ScreenHeader } from '@/components';
import { space } from '@/theme';

export function AccountsScreen() {
  const router = useRouter();
  return (
    <PhoneShell>
      <ScreenHeader title="Accounts" subtitle="Banks & wallets" onBack={() => router.back()} />
      <ScrollView
        contentContainerStyle={{ padding: space.screenX, paddingBottom: space.scrollBottom }}
      >
        <AppText>Accounts</AppText>
      </ScrollView>
    </PhoneShell>
  );
}
