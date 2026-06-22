import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import {
  AppText,
  BarChart,
  Card,
  CatIcon,
  Icon,
  PhoneShell,
  Pill,
  ProgressBar,
  ScreenHeader,
  SectionLabel,
  Spark,
} from '@/components';
import { CATEGORIES } from '@/lib/data';
import { fmt, net as netOf, savingsRate } from '@/lib/money';
import { useCategorySpend, useHistory, useIncomeSpending } from '@/store';
import { moneyText, useTheme } from '@/theme';

const RANGES = [
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: '6m', label: '6 Months' },
] as const;

export function AnalyticsScreen() {
  const t = useTheme();
  const [range, setRange] = useState<(typeof RANGES)[number]['key']>('6m');
  const history = useHistory();
  const { income, spending } = useIncomeSpending();
  const categorySpend = useCategorySpend();

  const net = netOf(income, spending);
  const savedPct = Math.round(savingsRate(income, spending) * 100);

  const may = history[history.length - 2]?.expense ?? 0;
  const jun = history[history.length - 1]?.expense ?? spending;
  const trendPct = may > 0 ? Math.round(((jun - may) / may) * 100) : 0;
  const less = jun <= may;

  const maxCat = categorySpend[0]?.amount ?? 1;

  return (
    <PhoneShell>
      <ScreenHeader title="Insights" subtitle="June 2026" />
      <View style={styles.ranges}>
        {RANGES.map((r) => (
          <Pill
            key={r.key}
            label={r.label}
            active={range === r.key}
            onPress={() => setRange(r.key)}
          />
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card>
          <View style={styles.netHead}>
            <View style={styles.netText}>
              <AppText variant="secondary" color={t.sub}>
                Net saved this month
              </AppText>
              <Text style={[moneyText, styles.netValue]}>{fmt(net)}</Text>
            </View>
            <View style={styles.badge}>
              <Icon name="income" color={t.income} size={13} />
              <AppText variant="caption" color={t.income}>
                {savedPct}%
              </AppText>
            </View>
          </View>
          <BarChart
            data={history.map((h) => ({ label: h.m, income: h.income, expense: h.expense }))}
          />
          <View style={styles.legend}>
            <LegendItem color={t.income} label="Income" />
            <LegendItem color={t.expense} label="Spending" />
          </View>
        </Card>

        <View>
          <SectionLabel title="Spending trend" />
          <Card>
            <View style={styles.trendHead}>
              <Text style={[moneyText, styles.trendValue]}>{fmt(spending)}</Text>
              <AppText variant="secondary" color={less ? t.income : t.sub}>
                {Math.abs(trendPct)}% {less ? 'less' : 'more'} than May
              </AppText>
            </View>
            <Spark values={history.map((h) => h.expense)} width={300} height={70} />
          </Card>
        </View>

        <View>
          <SectionLabel title="Top categories" />
          <Card>
            {categorySpend.slice(0, 5).map((c, i) => {
              const cat = CATEGORIES[c.cat];
              return (
                <View key={c.cat} style={i > 0 ? styles.catSpaced : undefined}>
                  <View style={styles.catHead}>
                    <CatIcon name={cat.icon} color={cat.color} size={30} />
                    <AppText variant="cardTitle" color={t.ink} style={styles.catLabel}>
                      {cat.label}
                    </AppText>
                    <AppText variant="cardTitle" color={t.ink}>
                      {fmt(c.amount)}
                    </AppText>
                  </View>
                  <ProgressBar ratio={c.amount / maxCat} color={cat.color} animate={false} />
                </View>
              );
            })}
          </Card>
        </View>
      </ScrollView>
    </PhoneShell>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  const t = useTheme();
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <AppText variant="caption" color={t.sub}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  ranges: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: theme.space.screenX,
    paddingBottom: 12,
  },
  content: {
    paddingHorizontal: theme.space.screenX,
    paddingBottom: theme.space.scrollBottom,
    gap: 16,
  },
  netHead: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  netText: { flex: 1 },
  netValue: { color: theme.income, fontFamily: theme.fonts.extrabold, fontSize: 28, marginTop: 2 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.incomeSoft,
    borderRadius: theme.radii.pill,
    paddingVertical: 5,
    paddingHorizontal: 9,
  },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 18, marginTop: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 999 },
  trendHead: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 8 },
  trendValue: { color: theme.ink, fontFamily: theme.fonts.extrabold, fontSize: 22 },
  catSpaced: { marginTop: 14 },
  catHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  catLabel: { flex: 1 },
}));
