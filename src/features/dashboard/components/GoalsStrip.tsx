import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppText, Card, CatIcon, ProgressBar } from '@/components';
import type { Goal } from '@/lib/data';
import { fmt, fraction } from '@/lib/money';
import { useTheme } from '@/theme';

export interface GoalsStripProps {
  goals: Goal[];
}

export function GoalsStrip({ goals }: GoalsStripProps) {
  const t = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.strip}
    >
      {goals.map((g) => {
        const pct = fraction(g.saved, g.target);
        return (
          <Card key={g.id} style={styles.card}>
            <View style={styles.headRow}>
              <CatIcon name={g.icon} color={g.color} size={36} />
              <AppText variant="cardTitle" color={t.ink}>
                {Math.round(pct * 100)}%
              </AppText>
            </View>
            <AppText variant="cardTitle" color={t.ink} numberOfLines={1}>
              {g.name}
            </AppText>
            <ProgressBar ratio={pct} color={g.color} />
            <AppText variant="secondary" color={t.sub}>
              {fmt(g.saved)} / {fmt(g.target)}
            </AppText>
          </Card>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create(() => ({
  strip: {
    gap: 12,
    paddingRight: 4,
  },
  card: {
    width: 180,
    gap: 10,
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
