import type { IconName } from '@/components/Icon';

import type { Money } from '../money';

import { BANKS } from './banks';
import { CATEGORIES } from './categories';
import type { Direction, Tx } from './types';

export interface TxView {
  icon: IconName;
  iconColor: string;
  merchant: string;
  sub: string;
  amount: Money;
  direction: Direction;
  parsed: boolean;
}

/** Map a transaction to the presentational fields a TxRow needs. */
export function txView(tx: Tx): TxView {
  const cat = CATEGORIES[tx.cat];
  return {
    icon: cat.icon,
    iconColor: cat.color,
    merchant: tx.merchant,
    sub: BANKS[tx.bank].label,
    amount: tx.amount,
    direction: tx.dir,
    parsed: tx.parsed,
  };
}
