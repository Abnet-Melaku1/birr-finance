import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Amount, AppText, CategoryPicker, CatIcon, Icon, Sheet } from '@/components';
import { BANKS, CATEGORIES } from '@/lib/data';
import { useDeleteTransaction, useSetCategory, useTransactions } from '@/store';
import { useTheme } from '@/theme';

export interface TxDetailSheetProps {
  id: string;
}

export function TxDetailSheet({ id }: TxDetailSheetProps) {
  const t = useTheme();
  const router = useRouter();
  const txns = useTransactions();
  const setCategory = useSetCategory();
  const deleteTransaction = useDeleteTransaction();
  const [editing, setEditing] = useState(false);

  const tx = txns.find((x) => x.id === id);
  if (!tx) {
    return (
      <Sheet title="Transaction" onClose={() => router.back()}>
        <AppText variant="secondary" color={t.sub}>
          This transaction is no longer available.
        </AppText>
      </Sheet>
    );
  }

  const cat = CATEGORIES[tx.cat];
  const bank = BANKS[tx.bank];

  return (
    <Sheet title="Transaction" onClose={() => router.back()}>
      <View style={styles.head}>
        <Amount value={tx.amount} direction={tx.dir} signed size={32} weight="extrabold" />
        <AppText variant="body" color={t.sub}>
          {tx.merchant} · {bank.full}
        </AppText>
      </View>

      <View style={styles.rows}>
        <View style={styles.row}>
          <AppText variant="secondary" color={t.sub}>
            Category
          </AppText>
          <Pressable
            onPress={() => setEditing((e) => !e)}
            accessibilityRole="button"
            style={styles.rowValue}
          >
            <CatIcon name={cat.icon} color={cat.color} size={26} />
            <AppText variant="cardTitle" color={t.ink}>
              {cat.label}
            </AppText>
            <Icon name="edit" color={t.primary} size={15} />
          </Pressable>
        </View>

        {editing ? (
          <CategoryPicker
            value={tx.cat}
            onSelect={(next) => {
              setCategory(tx.id, next);
              setEditing(false);
            }}
          />
        ) : null}

        <View style={styles.row}>
          <AppText variant="secondary" color={t.sub}>
            Account
          </AppText>
          <AppText variant="cardTitle" color={t.ink}>
            {bank.label}
          </AppText>
        </View>
        <View style={styles.row}>
          <AppText variant="secondary" color={t.sub}>
            Date
          </AppText>
          <AppText variant="cardTitle" color={t.ink}>
            Jun {tx.d} · {tx.t}
          </AppText>
        </View>
      </View>

      {tx.parsed && tx.raw ? (
        <View style={styles.rawBox}>
          <Text style={styles.rawText}>{tx.raw}</Text>
        </View>
      ) : null}

      <Pressable
        onPress={() => {
          deleteTransaction(tx.id);
          router.back();
        }}
        style={styles.delete}
        accessibilityRole="button"
      >
        <Icon name="trash" color={t.primary} size={16} />
        <AppText variant="cardTitle" color={t.primary}>
          Delete transaction
        </AppText>
      </Pressable>
    </Sheet>
  );
}

const styles = StyleSheet.create((theme) => ({
  head: { alignItems: 'center', gap: 4, marginBottom: 16 },
  rows: { gap: 14 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowValue: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rawBox: {
    backgroundColor: theme.surfaceAlt,
    borderRadius: theme.radii.tile,
    padding: 10,
    marginTop: 16,
  },
  rawText: {
    fontFamily: theme.fonts.mono,
    fontSize: 11,
    lineHeight: 16,
    color: theme.sub,
  },
  delete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    marginTop: 8,
  },
}));
