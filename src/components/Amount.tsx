import { Text } from 'react-native';

import type { Direction } from '@/lib/data/keys';
import { fmt, type Money } from '@/lib/money';
import { fonts, moneyText, useTheme } from '@/theme';

export interface AmountProps {
  value: Money;
  /** Drives color + sign: 'in' → green (+), 'out' → ink (−). Omit for neutral. */
  direction?: Direction;
  signed?: boolean;
  color?: string;
  size?: number;
  weight?: keyof typeof fonts;
}

export function Amount({
  value,
  direction,
  signed = false,
  color,
  size = 14,
  weight = 'bold',
}: AmountProps) {
  const t = useTheme();
  const isIncome = direction === 'in';

  const display = direction
    ? fmt(isIncome ? value : -value, { sign: signed && isIncome })
    : fmt(value, { sign: signed });
  const resolved = color ?? (isIncome ? t.income : t.expense);

  return (
    <Text style={[moneyText, { fontFamily: fonts[weight], fontSize: size, color: resolved }]}>
      {display}
    </Text>
  );
}
