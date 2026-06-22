import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppText, Icon, type IconName } from '@/components';
import { fmt, tint, type Money } from '@/lib/money';
import { moneyText, type as typePresets, useTheme } from '@/theme';

export interface BalanceHeroProps {
  month: string;
  balance: Money;
  income: Money;
  spending: Money;
}

export function BalanceHero({ month, balance, income, spending }: BalanceHeroProps) {
  const t = useTheme();
  const [hidden, setHidden] = useState(false);

  return (
    <View style={styles.hero}>
      <View style={styles.glow} />
      <View style={styles.headRow}>
        <AppText variant="secondary" color={t.heroSub}>
          Total balance · {month}
        </AppText>
        <Pressable
          onPress={() => setHidden((h) => !h)}
          hitSlop={10}
          accessibilityLabel={hidden ? 'Show balance' : 'Hide balance'}
        >
          <Icon name={hidden ? 'eyeOff' : 'eye'} color={t.heroSub} size={18} />
        </Pressable>
      </View>

      <Text style={[typePresets.heroBalance, moneyText, styles.balance]}>
        {hidden ? 'Br ••••••' : fmt(balance)}
      </Text>

      <View style={styles.tiles}>
        <HeroTile
          icon="arrowDown"
          label="Income"
          value={income}
          accent={t.income}
          hidden={hidden}
        />
        <HeroTile
          icon="arrowUp"
          label="Spending"
          value={spending}
          accent={t.heroInk}
          hidden={hidden}
        />
      </View>
    </View>
  );
}

function HeroTile({
  icon,
  label,
  value,
  accent,
  hidden,
}: {
  icon: IconName;
  label: string;
  value: Money;
  accent: string;
  hidden: boolean;
}) {
  const t = useTheme();
  return (
    <View style={styles.tile}>
      <View style={styles.tileIcon}>
        <Icon name={icon} color={accent} size={14} />
      </View>
      <View>
        <AppText variant="caption" color={t.heroSub}>
          {label}
        </AppText>
        <Text style={[moneyText, styles.tileValue]}>{hidden ? 'Br ••••' : fmt(value)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  hero: {
    backgroundColor: theme.heroBg,
    borderRadius: theme.radii.hero,
    padding: 18,
    overflow: 'hidden',
    shadowColor: theme.primary,
    shadowOpacity: theme.mode === 'bold' ? 0.3 : 0,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: theme.mode === 'bold' ? 6 : 0,
  },
  glow: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 999,
    backgroundColor: tint(theme.heroInk, theme.heroBg, 8),
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balance: {
    color: theme.heroInk,
    marginTop: 6,
    marginBottom: 16,
  },
  tiles: {
    flexDirection: 'row',
    gap: 10,
  },
  tile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: tint(theme.heroInk, theme.heroBg, 12),
    borderRadius: theme.radii.tile,
    padding: 12,
  },
  tileIcon: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: tint(theme.heroInk, theme.heroBg, 16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileValue: {
    color: theme.heroInk,
    fontFamily: theme.fonts.bold,
    fontSize: 15,
    marginTop: 1,
  },
}));
