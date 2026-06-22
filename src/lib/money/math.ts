import type { Money } from './Money';

/** Sum a list of money values (integer-safe). */
export function sum(values: readonly Money[]): Money {
  return values.reduce<Money>((acc, v) => acc + v, 0);
}

/**
 * Budget usage ratio: `spent / limit`. `> 1` means over budget (emphasize in
 * `primary`, CLAUDE.md §5.5). A non-positive limit yields 0 (avoid div-by-zero).
 */
export function budgetRatio(spent: Money, limit: Money): number {
  if (limit <= 0) return 0;
  return spent / limit;
}

/** Fraction of a whole as a 0–1 number; whole <= 0 → 0. */
export function fraction(part: Money, whole: Money): number {
  if (whole <= 0) return 0;
  return part / whole;
}

/** Net = income − expense (both passed as positive magnitudes). */
export function net(income: Money, expense: Money): Money {
  return income - expense;
}

/** Savings rate = (income − expense) / income, clamped to [0, 1]. */
export function savingsRate(income: Money, expense: Money): number {
  if (income <= 0) return 0;
  return clamp((income - expense) / income, 0, 1);
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
