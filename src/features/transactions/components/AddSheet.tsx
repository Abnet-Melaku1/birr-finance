import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppText, CatIcon, Icon, Monogram, Sheet } from '@/components';
import { BANKS, CATEGORY_LIST, type CategoryKey } from '@/lib/data';
import { nextId } from '@/lib/id';
import { fmt, type Money } from '@/lib/money';
import { useAccounts, useAddTransaction } from '@/store';
import { moneyText, useTheme } from '@/theme';

type Dir = 'out' | 'in';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'] as const;
const EXPENSE_CATS = CATEGORY_LIST.filter((c) => c.key !== 'income' && c.key !== 'transfer');

function toSantim(input: string): Money {
  if (!input || input === '.') return 0;
  return Math.round(parseFloat(input) * 100);
}

export function AddSheet() {
  const t = useTheme();
  const router = useRouter();
  const accounts = useAccounts();
  const addTransaction = useAddTransaction();

  const [dir, setDir] = useState<Dir>('out');
  const [input, setInput] = useState('');
  const [cat, setCat] = useState<CategoryKey>('food');
  const [acctId, setAcctId] = useState(accounts[0]?.id ?? '');

  const accent = dir === 'in' ? t.income : t.primary;
  const santim = toSantim(input);

  const press = (key: (typeof KEYS)[number]) => {
    setInput((prev) => {
      if (key === 'del') return prev.slice(0, -1);
      if (key === '.') return prev.includes('.') ? prev : prev === '' ? '0.' : prev + '.';
      return prev + key;
    });
  };

  const save = () => {
    const account = accounts.find((a) => a.id === acctId);
    if (!account || santim <= 0) {
      router.back();
      return;
    }
    addTransaction({
      id: nextId('m'),
      d: 23,
      t: '12:00',
      dir,
      amount: santim,
      cat: dir === 'in' ? 'income' : cat,
      acct: account.id,
      merchant: dir === 'in' ? 'Manual income' : 'Manual expense',
      parsed: false,
      bank: account.bank,
    });
    router.back();
  };

  return (
    <Sheet title="Add transaction" onClose={() => router.back()}>
      <View style={styles.segment}>
        {(['out', 'in'] as Dir[]).map((d) => {
          const active = dir === d;
          return (
            <Pressable
              key={d}
              onPress={() => setDir(d)}
              style={[styles.segmentItem, active && styles.segmentActive]}
            >
              <AppText
                variant="cardTitle"
                color={active ? (d === 'in' ? t.income : t.primary) : t.sub}
              >
                {d === 'in' ? 'Income' : 'Expense'}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <Text style={[moneyText, styles.amount, { color: accent }]}>{fmt(santim)}</Text>

      {dir === 'out' ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catRow}
        >
          {EXPENSE_CATS.map((c) => {
            const active = cat === c.key;
            return (
              <Pressable
                key={c.key}
                onPress={() => setCat(c.key)}
                style={[styles.catChip, { borderColor: active ? c.color : t.hairline }]}
              >
                <CatIcon name={c.icon} color={c.color} size={22} />
                <AppText variant="caption" color={t.ink}>
                  {c.label}
                </AppText>
              </Pressable>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.catRow}>
          <View style={[styles.catChip, { borderColor: t.income }]}>
            <Icon name="arrowDown" color={t.income} size={16} />
            <AppText variant="caption" color={t.income}>
              Income
            </AppText>
          </View>
        </View>
      )}

      <View style={styles.accounts}>
        {accounts.slice(0, 4).map((a) => {
          const bank = BANKS[a.bank];
          const active = acctId === a.id;
          return (
            <Pressable
              key={a.id}
              onPress={() => setAcctId(a.id)}
              style={[styles.acct, { borderColor: active ? t.primary : t.hairline }]}
            >
              <Monogram label={bank.mono} color={bank.color} size={30} />
              <AppText variant="micro" color={t.sub}>
                {bank.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.keypad}>
        {KEYS.map((key) => (
          <Pressable key={key} onPress={() => press(key)} style={styles.key}>
            {key === 'del' ? (
              <Icon name="chevronLeft" color={t.ink} size={22} />
            ) : (
              <Text style={[moneyText, styles.keyText, { color: t.ink }]}>{key}</Text>
            )}
          </Pressable>
        ))}
      </View>

      <Pressable onPress={save} style={[styles.save, { backgroundColor: accent }]}>
        <Icon name="check" color={t.onPrimary} size={18} />
        <AppText variant="cardTitle" color={t.onPrimary}>
          Save {dir === 'in' ? 'income' : 'expense'}
        </AppText>
      </Pressable>
    </Sheet>
  );
}

const styles = StyleSheet.create((theme) => ({
  segment: {
    flexDirection: 'row',
    backgroundColor: theme.chipBg,
    borderRadius: theme.radii.tile,
    padding: 4,
  },
  segmentItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: theme.radii.tile - 3,
  },
  segmentActive: { backgroundColor: theme.surface },
  amount: {
    textAlign: 'center',
    fontFamily: theme.fonts.extrabold,
    fontSize: 40,
    marginVertical: 16,
  },
  catRow: { gap: 8, paddingVertical: 2 },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: theme.radii.pill,
    borderWidth: 1.5,
  },
  accounts: { flexDirection: 'row', gap: 8, marginTop: 14 },
  acct: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
    paddingVertical: 10,
    borderRadius: theme.radii.tile,
    borderWidth: 1.5,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  key: {
    width: `${100 / 3}%`,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  keyText: { fontFamily: theme.fonts.bold, fontSize: 22 },
  save: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    borderRadius: theme.radii.card,
    marginTop: 8,
  },
}));
