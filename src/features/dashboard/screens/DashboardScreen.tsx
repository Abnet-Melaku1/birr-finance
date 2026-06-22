import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppText, Card, IconBtn, PhoneShell, SectionLabel, TxRow } from '@/components';
import { txView } from '@/lib/data';
import { space, useTheme } from '@/theme';

import { BalanceHero } from '../components/BalanceHero';
import { BudgetsPreview } from '../components/BudgetsPreview';
import { GoalsStrip } from '../components/GoalsStrip';
import { SmsBanner } from '../components/SmsBanner';
import { WhereItWent } from '../components/WhereItWent';
import { useDashboard } from '../hooks/useDashboard';

export function DashboardScreen() {
  const t = useTheme();
  const router = useRouter();
  const { user, balance, income, spending, categorySpend, budgets, recent, goals, unread } =
    useDashboard();

  return (
    <PhoneShell>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.greeting}>
          <Pressable
            onPress={() => router.push('/settings')}
            accessibilityRole="button"
            accessibilityLabel="Settings"
            style={styles.avatar}
          >
            <AppText variant="cardTitle" color={t.primary}>
              {user.initials}
            </AppText>
          </Pressable>
          <View style={styles.greetingText}>
            <AppText variant="secondary" color={t.sub}>
              Good morning
            </AppText>
            <AppText variant="cardTitle" color={t.ink}>
              {user.full}
            </AppText>
          </View>
          <IconBtn
            name="bell"
            badge={unread}
            accessibilityLabel="SMS inbox"
            onPress={() => router.push('/sms')}
          />
        </View>

        <BalanceHero month={user.month} balance={balance} income={income} spending={spending} />

        <SmsBanner count={unread} onPress={() => router.push('/sms')} />

        <View>
          <SectionLabel
            title="Where it went"
            action="Insights"
            onActionPress={() => router.push('/analytics')}
          />
          <WhereItWent data={categorySpend} total={spending} />
        </View>

        <View>
          <SectionLabel
            title="Budgets"
            action="Plan"
            onActionPress={() => router.push('/planner')}
          />
          <BudgetsPreview budgets={budgets} />
        </View>

        <View>
          <SectionLabel
            title="Recent activity"
            action="See all"
            onActionPress={() => router.push('/transactions')}
          />
          <Card>
            {recent.map((tx) => (
              <TxRow key={tx.id} {...txView(tx)} onPress={() => router.push(`/tx/${tx.id}`)} />
            ))}
          </Card>
        </View>

        <View>
          <SectionLabel
            title="Goals"
            action="All goals"
            onActionPress={() => router.push('/goals')}
          />
          <GoalsStrip goals={goals} />
        </View>
      </ScrollView>
    </PhoneShell>
  );
}

const styles = StyleSheet.create((theme) => ({
  content: {
    paddingHorizontal: space.screenX,
    paddingBottom: space.scrollBottom,
    gap: 18,
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 8,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: theme.radii.tile,
    backgroundColor: theme.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingText: { flex: 1 },
}));
