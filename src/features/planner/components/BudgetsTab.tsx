import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Amount, AppText, Card, CatIcon, Donut, ProgressBar, SectionLabel } from '@/components';
import { CATEGORIES } from '@/lib/data';
import { fmt, sum } from '@/lib/money';
import { useBudgetStatus } from '@/store';
import { moneyText, useTheme } from '@/theme';

export function BudgetsTab() {
  const t = useTheme();
  const budgets = useBudgetStatus();

  const totals = useMemo(() => {
    const limit = sum(budgets.map((b) => b.limit));
    const spent = sum(budgets.map((b) => b.spent));
    return { limit, spent, left: limit - spent, ratio: limit > 0 ? spent / limit : 0 };
  }, [budgets]);

  return (
    <View style={styles.wrap}>
      <Card>
        <View style={styles.summaryRow}>
          <View style={styles.summaryText}>
            <AppText variant="secondary" color={t.sub}>
              Left to spend
            </AppText>
            <Text style={[moneyText, styles.big]}>{fmt(totals.left)}</Text>
          </View>
          <Donut
            size={92}
            thickness={12}
            centerValue={`${Math.round(totals.ratio * 100)}%`}
            data={[
              { key: 'spent', value: totals.spent, color: t.primary },
              { key: 'left', value: Math.max(totals.left, 0), color: t.faint },
            ]}
          />
        </View>
        <ProgressBar ratio={totals.ratio} color={t.primary} />
        <View style={styles.summaryFoot}>
          <AppText variant="secondary" color={t.sub}>
            Spent {fmt(totals.spent)}
          </AppText>
          <AppText variant="secondary" color={t.sub}>
            Budget {fmt(totals.limit)}
          </AppText>
        </View>
      </Card>

      <View>
        <SectionLabel title="By category" action="Edit" />
        <View style={styles.list}>
          {budgets.map((b) => {
            const cat = CATEGORIES[b.cat];
            const left = b.limit - b.spent;
            return (
              <Card key={b.cat}>
                <View style={styles.cardHead}>
                  <CatIcon name={cat.icon} color={cat.color} size={36} />
                  <View style={styles.cardText}>
                    <AppText variant="cardTitle" color={t.ink}>
                      {cat.label}
                    </AppText>
                    <AppText variant="secondary" color={b.over ? t.primary : t.sub}>
                      {b.over ? `${fmt(-left)} over` : `${fmt(left)} left`}
                    </AppText>
                  </View>
                  <Amount value={b.spent} />
                </View>
                <ProgressBar ratio={b.ratio} color={cat.color} />
              </Card>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrap: { gap: 16 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  summaryText: { flex: 1 },
  big: { color: theme.ink, fontFamily: theme.fonts.extrabold, fontSize: 28, marginTop: 2 },
  summaryFoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  list: { gap: 12 },
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  cardText: { flex: 1 },
}));
