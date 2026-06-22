import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Amount, AppText, Card, Icon, SectionLabel } from '@/components';
import type { Bill } from '@/lib/data';
import { fmt, sum } from '@/lib/money';
import { useBills } from '@/store';
import { moneyText, useTheme } from '@/theme';

export function BillsTab() {
  const t = useTheme();
  const bills = useBills();
  const total = sum(bills.map((b) => b.amount));

  return (
    <View style={styles.wrap}>
      <View style={styles.summary}>
        <View style={styles.summaryIcon}>
          <Icon name="clock" color={t.onPrimary} size={20} />
        </View>
        <View style={styles.summaryText}>
          <AppText variant="secondary" color={t.sub}>
            Due this month
          </AppText>
          <Text style={[moneyText, styles.big]}>{fmt(total)}</Text>
        </View>
        <AppText variant="secondary" color={t.sub}>
          {bills.length} bills
        </AppText>
      </View>

      <View>
        <SectionLabel title="Upcoming" action="Add bill" />
        <View style={styles.list}>
          {bills.map((bill) => (
            <BillCard key={bill.id} bill={bill} />
          ))}
        </View>
      </View>
    </View>
  );
}

function BillCard({ bill }: { bill: Bill }) {
  const t = useTheme();
  const [mon = '', day = ''] = bill.due.split(' ');
  return (
    <Card>
      <View style={styles.row}>
        <View style={styles.dateChip}>
          <AppText variant="micro" color={t.primary}>
            {mon.toUpperCase()}
          </AppText>
          <AppText variant="cardTitle" color={t.ink}>
            {day}
          </AppText>
        </View>
        <View style={styles.billText}>
          <AppText variant="cardTitle" color={t.ink}>
            {bill.name}
          </AppText>
          <AppText variant="secondary" color={t.sub}>
            {bill.every}
          </AppText>
        </View>
        <Amount value={bill.amount} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrap: { gap: 16 },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.primarySoft,
    borderRadius: theme.radii.card,
    padding: 14,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.radii.tile,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryText: { flex: 1 },
  big: { color: theme.ink, fontFamily: theme.fonts.extrabold, fontSize: 24, marginTop: 1 },
  list: { gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dateChip: {
    width: 44,
    height: 44,
    borderRadius: theme.radii.tile,
    backgroundColor: theme.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  billText: { flex: 1 },
}));
