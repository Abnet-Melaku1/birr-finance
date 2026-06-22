import {
  useBudgetStatus,
  useCategorySpend,
  useGoals,
  useIncomeSpending,
  useRecentActivity,
  useTotalBalance,
  useUnreadSmsCount,
  useUser,
} from '@/store';

export function useDashboard() {
  const user = useUser();
  const balance = useTotalBalance();
  const { income, spending } = useIncomeSpending();
  const categorySpend = useCategorySpend();
  const budgets = useBudgetStatus();
  const recent = useRecentActivity(4);
  const goals = useGoals();
  const unread = useUnreadSmsCount();

  return { user, balance, income, spending, categorySpend, budgets, recent, goals, unread };
}
