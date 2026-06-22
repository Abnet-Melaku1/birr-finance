import { useMemo } from 'react';

import {
  budgetStatus,
  categorySpend,
  incomeAndSpending,
  recentActivity,
  totalBalance,
} from '@/lib/data/derive';

import { useDataStore } from './dataStore';

export const useUser = () => useDataStore((s) => s.user);
export const useAccounts = () => useDataStore((s) => s.accounts);
export const useTransactions = () => useDataStore((s) => s.transactions);
export const useSmsInbox = () => useDataStore((s) => s.smsInbox);
export const useBudgets = () => useDataStore((s) => s.budgets);
export const useBills = () => useDataStore((s) => s.bills);
export const useGoals = () => useDataStore((s) => s.goals);
export const useHistory = () => useDataStore((s) => s.history);

// Actions — selected individually so each reference is stable.
export const useAddTransaction = () => useDataStore((s) => s.addTransaction);
export const useSetCategory = () => useDataStore((s) => s.setCategory);
export const useDeleteTransaction = () => useDataStore((s) => s.deleteTransaction);
export const useFileSms = () => useDataStore((s) => s.fileSms);
export const useSetSmsCategory = () => useDataStore((s) => s.setSmsCategory);

export function useTotalBalance() {
  const accounts = useAccounts();
  return useMemo(() => totalBalance(accounts), [accounts]);
}

export function useIncomeSpending() {
  const txns = useTransactions();
  return useMemo(() => incomeAndSpending(txns), [txns]);
}

export function useCategorySpend() {
  const txns = useTransactions();
  return useMemo(() => categorySpend(txns), [txns]);
}

export function useBudgetStatus() {
  const budgets = useBudgets();
  return useMemo(() => budgetStatus(budgets), [budgets]);
}

export function useRecentActivity(n = 4) {
  const txns = useTransactions();
  return useMemo(() => recentActivity(txns, n), [txns, n]);
}

export function useUnreadSmsCount() {
  const inbox = useSmsInbox();
  return useMemo(() => inbox.filter((s) => !s.filed).length, [inbox]);
}
