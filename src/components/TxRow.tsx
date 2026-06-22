import { Pressable, View } from 'react-native';

import type { Direction } from '@/lib/data/keys';
import type { Money } from '@/lib/money';
import { radii, useTheme } from '@/theme';

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
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 8,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <CatIcon name={icon} color={iconColor} />
      <View style={{ flex: 1 }}>
        <AppText variant="cardTitle" color={t.ink} numberOfLines={1}>
          {merchant}
        </AppText>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 1 }}>
          <AppText variant="secondary" color={t.sub} numberOfLines={1} style={{ flexShrink: 1 }}>
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
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: radii.pill,
        backgroundColor: t.primarySoft,
      }}
    >
      <Icon name="scan" color={t.primary} size={9} />
      <AppText variant="micro" color={t.primary}>
        SMS
      </AppText>
    </View>
  );
}
