import { budgetRatio, sum, type Money } from '../money';

import type { Account, Budget, CategoryKey, Tx } from './types';

export function totalBalance(accounts: Account[]): Money {
  return sum(accounts.map((a) => a.balance));
}

export interface InOut {
  income: Money;
  spending: Money;
}

export function incomeAndSpending(txns: Tx[]): InOut {
  let income = 0;
  let spending = 0;
  for (const tx of txns) {
    if (tx.dir === 'in') income += tx.amount;
    else spending += tx.amount;
  }
  return { income, spending };
}

export interface CategorySpend {
  cat: CategoryKey;
  amount: Money;
  pct: number; // 0–1 share of total spending
}

export function categorySpend(txns: Tx[]): CategorySpend[] {
  const totals = new Map<CategoryKey, Money>();
  for (const tx of txns) {
    if (tx.dir !== 'out') continue;
    totals.set(tx.cat, (totals.get(tx.cat) ?? 0) + tx.amount);
  }
  const total = sum([...totals.values()]);
  return [...totals.entries()]
    .map(([cat, amount]) => ({ cat, amount, pct: total > 0 ? amount / total : 0 }))
    .sort((a, b) => b.amount - a.amount);
}

export interface BudgetStatus extends Budget {
  ratio: number;
  over: boolean;
}

export function budgetStatus(budgets: Budget[]): BudgetStatus[] {
  return budgets
    .map((b) => ({ ...b, ratio: budgetRatio(b.spent, b.limit), over: b.spent > b.limit }))
    .sort((a, b) => b.ratio - a.ratio);
}

export function recentActivity(txns: Tx[], n: number): Tx[] {
  return [...txns].sort((a, b) => b.d - a.d || b.t.localeCompare(a.t)).slice(0, n);
}
