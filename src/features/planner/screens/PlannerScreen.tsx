import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { PhoneShell, Pill, ScreenHeader, ThemeToggle } from '@/components';
import { space } from '@/theme';

import { BillsTab } from '../components/BillsTab';
import { BudgetsTab } from '../components/BudgetsTab';
import { CalendarTab } from '../components/CalendarTab';

type PlannerTab = 'budgets' | 'bills' | 'calendar';

const TABS: { key: PlannerTab; label: string }[] = [
  { key: 'budgets', label: 'Budgets' },
  { key: 'bills', label: 'Bills' },
  { key: 'calendar', label: 'Calendar' },
];

export function PlannerScreen() {
  const [tab, setTab] = useState<PlannerTab>('budgets');

  return (
    <PhoneShell>
      <ScreenHeader title="Planner" subtitle="June 2026" right={<ThemeToggle />} />
      <View style={styles.tabs}>
        {TABS.map((x) => (
          <Pill key={x.key} label={x.label} active={tab === x.key} onPress={() => setTab(x.key)} />
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {tab === 'budgets' ? <BudgetsTab /> : null}
        {tab === 'bills' ? <BillsTab /> : null}
        {tab === 'calendar' ? <CalendarTab /> : null}
      </ScrollView>
    </PhoneShell>
  );
}

const styles = StyleSheet.create(() => ({
  tabs: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: space.screenX,
    paddingBottom: 12,
  },
  content: {
    paddingHorizontal: space.screenX,
    paddingBottom: space.scrollBottom,
  },
}));
