import { useMemo } from 'react';

import type { Tx } from '@/lib/data';
import type { Money } from '@/lib/money';
import { useTransactions } from '@/store';

export type TxFilter = 'all' | 'expense' | 'income';

// Reference "today" for relative day labels (the app's June 2026 context).
const REF_DAY = 23;

export interface DayGroup {
  day: number;
  label: string;
  net: Money;
  items: Tx[];
}

function dayLabel(d: number): string {
  if (d === REF_DAY) return `Today · Jun ${d}`;
  if (d === REF_DAY - 1) return `Yesterday · Jun ${d}`;
  return `June ${d}`;
}

export function useTransactionsFeed(filter: TxFilter): DayGroup[] {
  const txns = useTransactions();

  return useMemo(() => {
    const matches = (tx: Tx) =>
      filter === 'all' ? true : filter === 'income' ? tx.dir === 'in' : tx.dir === 'out';

    const byDay = new Map<number, Tx[]>();
    for (const tx of txns) {
      if (!matches(tx)) continue;
      const list = byDay.get(tx.d) ?? [];
      list.push(tx);
      byDay.set(tx.d, list);
    }

    return [...byDay.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([day, items]) => ({
        day,
        label: dayLabel(day),
        net: items.reduce<Money>((acc, tx) => acc + (tx.dir === 'in' ? tx.amount : -tx.amount), 0),
        items: items.sort((a, b) => b.t.localeCompare(a.t)),
      }));
  }, [txns, filter]);
}
