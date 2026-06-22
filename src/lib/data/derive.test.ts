import { birr } from '../money';

import {
  budgetStatus,
  categorySpend,
  incomeAndSpending,
  recentActivity,
  totalBalance,
} from './derive';
import { ACCOUNTS, BUDGETS, TRANSACTIONS } from './mock';

describe('totalBalance', () => {
  it('sums account balances to the dashboard hero total', () => {
    expect(totalBalance(ACCOUNTS)).toBe(birr(116115));
  });
});

describe('incomeAndSpending', () => {
  it('splits the mock transactions into the headline totals', () => {
    const { income, spending } = incomeAndSpending(TRANSACTIONS);
    expect(income).toBe(birr(32500));
    expect(spending).toBe(birr(16343));
  });
});

describe('categorySpend', () => {
  const spend = categorySpend(TRANSACTIONS);

  it('ranks spending categories descending with rent on top', () => {
    expect(spend[0]?.cat).toBe('rent');
    expect(spend[0]?.amount).toBe(birr(6500));
  });

  it('shares sum to 1 and exclude income', () => {
    const totalPct = spend.reduce((acc, s) => acc + s.pct, 0);
    expect(totalPct).toBeCloseTo(1);
    expect(spend.some((s) => s.cat === 'income')).toBe(false);
  });
});

describe('budgetStatus', () => {
  it('flags over-budget categories and sorts by ratio', () => {
    const status = budgetStatus(BUDGETS);
    expect(status[0]?.cat).toBe('shopping');
    expect(status[0]?.over).toBe(true);
  });
});

describe('recentActivity', () => {
  it('returns the most recent N by day then time', () => {
    const recent = recentActivity(TRANSACTIONS, 3);
    expect(recent).toHaveLength(3);
    expect(recent[0]?.d).toBeGreaterThanOrEqual(recent[1]?.d ?? 0);
  });
});
