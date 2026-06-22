import { ScrollView } from 'react-native';

import { AppText, PhoneShell, ScreenHeader } from '@/components';
import { space } from '@/theme';

export function TransactionsScreen() {
  return (
    <PhoneShell>
      <ScreenHeader title="Activity" subtitle="June 2026" />
      <ScrollView
        contentContainerStyle={{ padding: space.screenX, paddingBottom: space.scrollBottom }}
      >
        <AppText>Transactions</AppText>
      </ScrollView>
    </PhoneShell>
  );
}
