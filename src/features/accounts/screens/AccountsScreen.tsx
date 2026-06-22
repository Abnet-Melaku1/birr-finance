import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Amount, AppText, Card, Icon, Monogram, PhoneShell, ScreenHeader } from '@/components';
import { BANKS, type AccountType } from '@/lib/data';
import { fmt } from '@/lib/money';
import { useAccounts, useTotalBalance } from '@/store';
import { moneyText, useTheme } from '@/theme';

const TYPE_LABEL: Record<AccountType, string> = {
  bank: 'Bank',
  savings: 'Savings',
  wallet: 'Mobile wallet',
};

export function AccountsScreen() {
  const t = useTheme();
  const router = useRouter();
  const accounts = useAccounts();
  const total = useTotalBalance();

  return (
    <PhoneShell>
      <ScreenHeader title="Accounts" subtitle="Banks & wallets" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card>
          <AppText variant="secondary" color={t.sub}>
            Total balance
          </AppText>
          <Text style={[moneyText, styles.total]}>{fmt(total)}</Text>
        </Card>

        <Card>
          {accounts.map((a, i) => {
            const bank = BANKS[a.bank];
            return (
              <View key={a.id} style={[styles.row, i > 0 && styles.divider]}>
                <Monogram label={bank.mono} color={bank.color} />
                <View style={styles.rowText}>
                  <AppText variant="cardTitle" color={t.ink}>
                    {a.name}
                  </AppText>
                  <AppText variant="secondary" color={t.sub}>
                    {bank.label} · {a.number} · {TYPE_LABEL[a.type]}
                  </AppText>
                </View>
                <Amount value={a.balance} />
              </View>
            );
          })}
        </Card>

        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.link, pressed && styles.pressed]}
        >
          <Icon name="plus" color={t.primary} size={18} />
          <AppText variant="cardTitle" color={t.primary}>
            Link an account
          </AppText>
        </Pressable>
      </ScrollView>
    </PhoneShell>
  );
}

const styles = StyleSheet.create((theme) => ({
  content: {
    paddingHorizontal: theme.space.screenX,
    paddingBottom: theme.space.scrollBottom,
    gap: 12,
  },
  total: { color: theme.ink, fontFamily: theme.fonts.extrabold, fontSize: 28, marginTop: 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  divider: { borderTopWidth: 1, borderTopColor: theme.faint },
  rowText: { flex: 1 },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: theme.radii.card,
    borderWidth: 1.5,
    borderColor: theme.hairline,
  },
  pressed: { opacity: 0.6 },
}));
