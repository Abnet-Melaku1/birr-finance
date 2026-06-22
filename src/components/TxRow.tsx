import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { Direction } from '@/lib/data/keys';
import type { Money } from '@/lib/money';
import { useTheme } from '@/theme';

import { Amount } from './Amount';
import { AppText } from './AppText';
import { CatIcon } from './CatIcon';
import { Icon, type IconName } from './Icon';

export interface TxRowProps {
  icon: IconName;
  iconColor: string;
  merchant: string;
  /** Secondary line, e.g. "Commercial Bank of Ethiopia". */
  sub: string;
  amount: Money;
  direction: Direction;
  /** Captured from SMS — shows an "SMS" badge. */
  parsed?: boolean;
  onPress?: () => void;
}

export function TxRow({
  icon,
  iconColor,
  merchant,
  sub,
  amount,
  direction,
  parsed = false,
  onPress,
}: TxRowProps) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <CatIcon name={icon} color={iconColor} />
      <View style={styles.body}>
        <AppText variant="cardTitle" color={t.ink} numberOfLines={1}>
          {merchant}
        </AppText>
        <View style={styles.subRow}>
          <AppText variant="secondary" color={t.sub} numberOfLines={1} style={styles.sub}>
            {sub}
          </AppText>
          {parsed ? <SmsBadge /> : null}
        </View>
      </View>
      <Amount value={amount} direction={direction} signed />
    </Pressable>
  );
}

function SmsBadge() {
  const t = useTheme();
  return (
    <View style={styles.badge}>
      <Icon name="scan" color={t.primary} size={9} />
      <AppText variant="micro" color={t.primary}>
        SMS
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  pressed: { opacity: 0.6 },
  body: { flex: 1 },
  subRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 1 },
  sub: { flexShrink: 1 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.primarySoft,
  },
}));
