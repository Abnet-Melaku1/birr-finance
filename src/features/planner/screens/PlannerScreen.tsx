import { ScrollView } from 'react-native';

import { AppText, PhoneShell, ScreenHeader } from '@/components';
import { space } from '@/theme';

export function PlannerScreen() {
  return (
    <PhoneShell>
      <ScreenHeader title="Planner" subtitle="Budgets, bills & goals" />
      <ScrollView
        contentContainerStyle={{ padding: space.screenX, paddingBottom: space.scrollBottom }}
      >
        <AppText>Planner</AppText>
      </ScrollView>
    </PhoneShell>
  );
}
