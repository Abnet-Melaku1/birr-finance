import { ACCOUNTS, BILLS, BUDGETS, GOALS, HISTORY, SMS_INBOX, TRANSACTIONS, USER } from './mock';
import type { Account, Bill, Budget, Goal, History, SmsInbox, Tx, User } from './types';

export interface DataSnapshot {
  user: User;
  accounts: Account[];
  transactions: Tx[];
  smsInbox: SmsInbox[];
  budgets: Budget[];
  bills: Bill[];
  goals: Goal[];
  history: History[];
}

/**
 * Persistence seam. The mock keeps data in memory; Phase 8 swaps in a
 * SQLite-backed implementation of this same interface.
 */
export interface DataRepo {
  getSnapshot(): DataSnapshot;
  addTransaction(tx: Tx): void;
  updateTransaction(id: string, patch: Partial<Tx>): void;
  deleteTransaction(id: string): void;
}

export function createMockRepo(): DataRepo {
  let transactions: Tx[] = TRANSACTIONS.map((tx) => ({ ...tx }));

  return {
    getSnapshot: () => ({
      user: USER,
      accounts: ACCOUNTS,
      transactions,
      smsInbox: SMS_INBOX,
      budgets: BUDGETS,
      bills: BILLS,
      goals: GOALS,
      history: HISTORY,
    }),
    addTransaction: (tx) => {
      transactions = [tx, ...transactions];
    },
    updateTransaction: (id, patch) => {
      transactions = transactions.map((tx) => (tx.id === id ? { ...tx, ...patch } : tx));
    },
    deleteTransaction: (id) => {
      transactions = transactions.filter((tx) => tx.id !== id);
    },
  };
}

export const mockRepo = createMockRepo();
