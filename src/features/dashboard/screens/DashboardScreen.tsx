import { ScrollView } from 'react-native';

import { AppText, PhoneShell, ScreenHeader } from '@/components';
import { space } from '@/theme';

export function DashboardScreen() {
  return (
    <PhoneShell>
      <ScreenHeader title="Good morning" subtitle="Abnet Melaku" />
      <ScrollView
        contentContainerStyle={{ padding: space.screenX, paddingBottom: space.scrollBottom }}
      >
        <AppText>Dashboard</AppText>
      </ScrollView>
    </PhoneShell>
  );
}
