import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppText, Card, IconBtn, PhoneShell, Pill, ScreenHeader, TxRow } from '@/components';
import { txView } from '@/lib/data';
import { fmt } from '@/lib/money';
import { space, useTheme } from '@/theme';

import { useTransactionsFeed, type TxFilter } from '../hooks/useTransactionsFeed';

const FILTERS: { key: TxFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'expense', label: 'Expense' },
  { key: 'income', label: 'Income' },
];

export function TransactionsScreen() {
  const t = useTheme();
  const router = useRouter();
  const [filter, setFilter] = useState<TxFilter>('all');
  const groups = useTransactionsFeed(filter);

  return (
    <PhoneShell>
      <ScreenHeader
        title="Activity"
        right={<IconBtn name="search" accessibilityLabel="Search transactions" size={40} />}
      />
      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <Pill
            key={f.key}
            label={f.label}
            active={filter === f.key}
            onPress={() => setFilter(f.key)}
          />
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {groups.map((group) => (
          <View key={group.day} style={styles.group}>
            <View style={styles.groupHead}>
              <AppText variant="caption" color={t.sub}>
                {group.label}
              </AppText>
              <AppText variant="caption" color={t.sub}>
                {fmt(group.net, { sign: true })}
              </AppText>
            </View>
            <Card>
              {group.items.map((tx) => (
                <TxRow key={tx.id} {...txView(tx)} onPress={() => router.push(`/tx/${tx.id}`)} />
              ))}
            </Card>
          </View>
        ))}
      </ScrollView>
    </PhoneShell>
  );
}

const styles = StyleSheet.create(() => ({
  filters: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: space.screenX,
    paddingBottom: 12,
  },
  content: {
    paddingHorizontal: space.screenX,
    paddingBottom: space.scrollBottom,
    gap: 16,
  },
  group: { gap: 8 },
  groupHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
}));
