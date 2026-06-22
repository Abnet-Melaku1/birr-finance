import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppText, Card, Donut } from '@/components';
import { CATEGORIES, type CategorySpend } from '@/lib/data';
import { fmt, type Money } from '@/lib/money';
import { useTheme } from '@/theme';

export interface WhereItWentProps {
  data: CategorySpend[];
  total: Money;
}

export function WhereItWent({ data, total }: WhereItWentProps) {
  const t = useTheme();
  const segments = data.map((d) => ({
    key: d.cat,
    value: d.amount,
    color: CATEGORIES[d.cat].color,
  }));
  const legend = data.slice(0, 4);

  return (
    <Card>
      <View style={styles.row}>
        <Donut data={segments} centerLabel="Spent" centerValue={fmt(total)} />
        <View style={styles.legend}>
          {legend.map((d) => (
            <View key={d.cat} style={styles.legendRow}>
              <View style={[styles.dot, { backgroundColor: CATEGORIES[d.cat].color }]} />
              <AppText variant="body" color={t.ink} numberOfLines={1} style={styles.legendLabel}>
                {CATEGORIES[d.cat].label}
              </AppText>
              <AppText variant="body" color={t.sub}>
                {Math.round(d.pct * 100)}%
              </AppText>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create(() => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  legend: {
    flex: 1,
    gap: 10,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  legendLabel: { flex: 1 },
}));
