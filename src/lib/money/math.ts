import type { Money } from './Money';

export function sum(values: readonly Money[]): Money {
  return values.reduce<Money>((acc, v) => acc + v, 0);
}

/** spent / limit; `> 1` means over budget. Non-positive limit → 0. */
export function budgetRatio(spent: Money, limit: Money): number {
  if (limit <= 0) return 0;
  return spent / limit;
}

export function fraction(part: Money, whole: Money): number {
  if (whole <= 0) return 0;
  return part / whole;
}

export function net(income: Money, expense: Money): Money {
  return income - expense;
}

export function savingsRate(income: Money, expense: Money): number {
  if (income <= 0) return 0;
  return clamp((income - expense) / income, 0, 1);
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
