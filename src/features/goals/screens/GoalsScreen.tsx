import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppText, Card, CatIcon, Icon, PhoneShell, ProgressBar, ScreenHeader } from '@/components';
import { fmt, fraction } from '@/lib/money';
import { useGoals } from '@/store';
import { useTheme } from '@/theme';

export function GoalsScreen() {
  const t = useTheme();
  const router = useRouter();
  const goals = useGoals();

  return (
    <PhoneShell>
      <ScreenHeader title="Goals" subtitle="Savings targets" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {goals.map((g) => {
          const pct = fraction(g.saved, g.target);
          return (
            <Card key={g.id}>
              <View style={styles.head}>
                <CatIcon name={g.icon} color={g.color} size={40} />
                <View style={styles.headText}>
                  <AppText variant="cardTitle" color={t.ink}>
                    {g.name}
                  </AppText>
                  <AppText variant="secondary" color={t.sub}>
                    ETA {g.eta}
                  </AppText>
                </View>
                <AppText variant="cardTitle" color={t.ink}>
                  {Math.round(pct * 100)}%
                </AppText>
              </View>
              <ProgressBar ratio={pct} color={g.color} />
              <View style={styles.foot}>
                <AppText variant="secondary" color={t.sub}>
                  {fmt(g.saved)} saved
                </AppText>
                <AppText variant="secondary" color={t.sub}>
                  of {fmt(g.target)}
                </AppText>
              </View>
            </Card>
          );
        })}

        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.link, pressed && styles.pressed]}
        >
          <Icon name="plus" color={t.primary} size={18} />
          <AppText variant="cardTitle" color={t.primary}>
            New goal
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
  head: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  headText: { flex: 1 },
  foot: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
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
