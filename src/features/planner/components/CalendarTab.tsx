import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Amount, AppText, Card, Icon } from '@/components';
import { useAccounts, useBills, useTransactions } from '@/store';
import { categoryColors, useTheme } from '@/theme';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const BILL_DUE = categoryColors.transport; // blue accent for bill-due dots

interface DayMark {
  income: boolean;
  spending: boolean;
  bill: boolean;
}

function billOrder(due: string): number {
  const [mon = '', day = ''] = due.split(' ');
  return (mon === 'Jul' ? 7 : 6) * 100 + Number(day);
}

export function CalendarTab() {
  const t = useTheme();
  const txns = useTransactions();
  const bills = useBills();
  const accounts = useAccounts();
  const [selected, setSelected] = useState(9);

  const marks = useMemo(() => {
    const map = new Map<number, DayMark>();
    const get = (d: number) => {
      let m = map.get(d);
      if (!m) {
        m = { income: false, spending: false, bill: false };
        map.set(d, m);
      }
      return m;
    };
    for (const tx of txns) {
      if (tx.dir === 'in') get(tx.d).income = true;
      else get(tx.d).spending = true;
    }
    for (const b of bills) {
      const [mon = '', day = ''] = b.due.split(' ');
      if (mon === 'Jun') get(Number(day)).bill = true;
    }
    return map;
  }, [txns, bills]);

  const firstWeekday = new Date(2026, 5, 1).getDay();
  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: 30 }, (_, i) => i + 1),
  ];

  const nextBill = useMemo(
    () => [...bills].sort((a, b) => billOrder(a.due) - billOrder(b.due))[0],
    [bills],
  );
  const nextAcct = nextBill ? accounts.find((a) => a.id === nextBill.acct) : undefined;

  return (
    <View style={styles.wrap}>
      <Card>
        <View style={styles.calHead}>
          <AppText variant="cardTitle" color={t.ink}>
            June 2026
          </AppText>
          <View style={styles.calNav}>
            <Icon name="chevronLeft" color={t.sub} size={20} />
            <Icon name="chevronRight" color={t.sub} size={20} />
          </View>
        </View>

        <View style={styles.weekRow}>
          {WEEKDAYS.map((d, i) => (
            <AppText key={i} variant="micro" color={t.sub} style={styles.cellText}>
              {d}
            </AppText>
          ))}
        </View>

        <View style={styles.grid}>
          {cells.map((day, i) => {
            if (day === null) return <View key={`blank-${i}`} style={styles.cell} />;
            const mark = marks.get(day);
            const isSelected = selected === day;
            return (
              <Pressable key={day} style={styles.cell} onPress={() => setSelected(day)}>
                <View style={[styles.bubble, isSelected && { backgroundColor: t.primary }]}>
                  <AppText variant="body" color={isSelected ? t.onPrimary : t.ink}>
                    {day}
                  </AppText>
                </View>
                <View style={styles.dots}>
                  {mark?.income ? <Dot color={t.income} /> : null}
                  {mark?.spending ? <Dot color={t.primary} /> : null}
                  {mark?.bill ? <Dot color={BILL_DUE} /> : null}
                </View>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <View style={styles.legend}>
        <LegendItem color={t.income} label="Income" />
        <LegendItem color={t.primary} label="Spending" />
        <LegendItem color={BILL_DUE} label="Bill due" />
      </View>

      {nextBill ? (
        <Card>
          <View style={styles.nextRow}>
            <View style={styles.nextIcon}>
              <Icon name="zap" color={BILL_DUE} size={20} />
            </View>
            <View style={styles.nextText}>
              <AppText variant="cardTitle" color={t.ink}>
                Next: {nextBill.name}
              </AppText>
              <AppText variant="secondary" color={t.sub}>
                {nextBill.due} · from {nextAcct?.name ?? 'account'}
              </AppText>
            </View>
            <Amount value={nextBill.amount} />
          </View>
        </Card>
      ) : null}
    </View>
  );
}

function Dot({ color }: { color: string }) {
  return <View style={[styles.dot, { backgroundColor: color }]} />;
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
  wrap: { gap: 16 },
  calHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  calNav: { flexDirection: 'row', gap: 16 },
  weekRow: { flexDirection: 'row', marginBottom: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    paddingVertical: 4,
  },
  cellText: { width: `${100 / 7}%`, textAlign: 'center' },
  bubble: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: { flexDirection: 'row', gap: 2, height: 6, marginTop: 1 },
  dot: { width: 5, height: 5, borderRadius: 999 },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 18 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  nextRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  nextIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.radii.tile,
    backgroundColor: theme.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: { flex: 1 },
}));
