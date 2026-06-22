import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppText, Card, ProgressBar } from '@/components';
import { CATEGORIES, type BudgetStatus } from '@/lib/data';
import { fmt } from '@/lib/money';
import { useTheme } from '@/theme';

export interface BudgetsPreviewProps {
  budgets: BudgetStatus[];
}

export function BudgetsPreview({ budgets }: BudgetsPreviewProps) {
  const t = useTheme();
  const top = budgets.slice(0, 3);

  return (
    <Card>
      {top.map((b, i) => (
        <View key={b.cat} style={i > 0 ? styles.spaced : undefined}>
          <View style={styles.head}>
            <AppText variant="cardTitle" color={t.ink}>
              {CATEGORIES[b.cat].label}
            </AppText>
            <AppText variant="secondary" color={b.over ? t.primary : t.sub}>
              {fmt(b.spent)} / {fmt(b.limit)}
            </AppText>
          </View>
          <ProgressBar ratio={b.ratio} color={CATEGORIES[b.cat].color} />
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create(() => ({
  spaced: { marginTop: 14 },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
}));
