import { ScrollView } from 'react-native';

import { AppText, PhoneShell, ScreenHeader } from '@/components';
import { space } from '@/theme';

export function AnalyticsScreen() {
  return (
    <PhoneShell>
      <ScreenHeader title="Insights" subtitle="June 2026" />
      <ScrollView
        contentContainerStyle={{ padding: space.screenX, paddingBottom: space.scrollBottom }}
      >
        <AppText>Analytics</AppText>
      </ScrollView>
    </PhoneShell>
  );
}
