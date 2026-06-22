import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Amount, AppText, CatIcon, Icon, Monogram } from '@/components';
import { BANKS, CATEGORIES, type SmsInbox } from '@/lib/data';
import { useTheme } from '@/theme';

export interface SmsCardProps {
  item: SmsInbox;
  onConfirm: () => void;
  onChange: () => void;
}

export function SmsCard({ item, onConfirm, onChange }: SmsCardProps) {
  const t = useTheme();
  const bank = BANKS[item.bank];
  const cat = CATEGORIES[item.cat];
  const filed = item.filed ?? false;

  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <Monogram label={bank.mono} color={bank.color} />
        <View style={styles.headText}>
          <AppText variant="cardTitle" color={t.ink} numberOfLines={1}>
            {item.merchant}
          </AppText>
          <AppText variant="secondary" color={t.sub} numberOfLines={1}>
            {bank.full} · {item.time}
          </AppText>
        </View>
        <Amount value={item.amount} direction={item.dir} signed />
      </View>

      <View style={styles.rawBox}>
        <Text style={styles.rawText}>{item.raw}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={onChange}
          accessibilityRole="button"
          accessibilityLabel="Change category"
          style={styles.chip}
        >
          <CatIcon name={cat.icon} color={cat.color} size={22} />
          <AppText variant="caption" color={t.sub} numberOfLines={1} style={styles.chipLabel}>
            Auto-filed as <AppText color={t.ink}>{cat.label}</AppText>
          </AppText>
          <Icon name="edit" color={t.sub} size={13} />
        </Pressable>

        {filed ? (
          <View style={styles.added}>
            <Icon name="check" color={t.income} size={14} />
            <AppText variant="caption" color={t.income}>
              Added
            </AppText>
          </View>
        ) : (
          <Pressable onPress={onConfirm} accessibilityRole="button" style={styles.confirm}>
            <Icon name="check" color={t.onPrimary} size={14} />
            <AppText variant="caption" color={t.onPrimary}>
              Looks right
            </AppText>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.surface,
    borderRadius: theme.radii.card,
    padding: theme.space.card,
    gap: 12,
    borderWidth: theme.mode === 'dark' ? 1 : 0,
    borderColor: theme.hairline,
  },
  head: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headText: { flex: 1 },
  rawBox: {
    backgroundColor: theme.surfaceAlt,
    borderRadius: theme.radii.tile,
    padding: 10,
  },
  rawText: {
    fontFamily: theme.fonts.mono,
    fontSize: 11,
    lineHeight: 16,
    color: theme.sub,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  chipLabel: { flexShrink: 1 },
  confirm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: theme.primary,
    borderRadius: theme.radii.pill,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  added: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: theme.incomeSoft,
    borderRadius: theme.radii.pill,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
}));
