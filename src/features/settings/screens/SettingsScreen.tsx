import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import {
  AppText,
  Card,
  Icon,
  Monogram,
  PhoneShell,
  ScreenHeader,
  SectionLabel,
} from '@/components';
import { BANK_LIST } from '@/lib/data';
import { useThemePref, type ThemePref, useTheme } from '@/theme';

const APPEARANCE: { key: ThemePref; label: string; desc: string }[] = [
  { key: 'system', label: 'System', desc: 'Match your phone' },
  { key: 'bold', label: 'Bold Orange', desc: 'Light theme' },
  { key: 'dark', label: 'Warm Dark', desc: 'Dark theme' },
];

export function SettingsScreen() {
  const t = useTheme();
  const router = useRouter();
  const { pref, setPref } = useThemePref();

  return (
    <PhoneShell>
      <ScreenHeader title="Settings" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View>
          <SectionLabel title="Appearance" />
          <Card>
            {APPEARANCE.map((o, i) => (
              <Pressable
                key={o.key}
                onPress={() => setPref(o.key)}
                accessibilityRole="radio"
                accessibilityState={{ selected: pref === o.key }}
                style={[styles.row, i > 0 && styles.divider]}
              >
                <View style={styles.rowText}>
                  <AppText variant="cardTitle" color={t.ink}>
                    {o.label}
                  </AppText>
                  <AppText variant="secondary" color={t.sub}>
                    {o.desc}
                  </AppText>
                </View>
                {pref === o.key ? <Icon name="check" color={t.primary} size={20} /> : null}
              </Pressable>
            ))}
          </Card>
        </View>

        <View>
          <SectionLabel title="Banks & SMS senders" />
          <Card>
            {BANK_LIST.map((b, i) => (
              <View key={b.key} style={[styles.row, i > 0 && styles.divider]}>
                <Monogram label={b.mono} color={b.color} size={34} />
                <View style={styles.rowText}>
                  <AppText variant="cardTitle" color={t.ink}>
                    {b.full}
                  </AppText>
                  <AppText variant="secondary" color={t.sub}>
                    Auto-detect transaction SMS
                  </AppText>
                </View>
                <View style={styles.onPill}>
                  <AppText variant="caption" color={t.income}>
                    On
                  </AppText>
                </View>
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>
    </PhoneShell>
  );
}

const styles = StyleSheet.create((theme) => ({
  content: {
    paddingHorizontal: theme.space.screenX,
    paddingBottom: theme.space.scrollBottom,
    gap: 16,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  divider: { borderTopWidth: 1, borderTopColor: theme.faint },
  rowText: { flex: 1 },
  onPill: {
    backgroundColor: theme.incomeSoft,
    borderRadius: theme.radii.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
}));
