import { create } from 'zustand';

import { createRepo } from '@/lib/data/createRepo';
import type { DataSnapshot } from '@/lib/data/repo';
import type { CategoryKey, Tx } from '@/lib/data/types';

const repo = createRepo();

interface DataState extends DataSnapshot {
  addTransaction: (tx: Tx) => void;
  setCategory: (id: string, cat: CategoryKey) => void;
  deleteTransaction: (id: string) => void;
  fileSms: (id: string) => void;
  setSmsCategory: (id: string, cat: CategoryKey) => void;
}

export const useDataStore = create<DataState>((set, get) => ({
  ...repo.getSnapshot(),

  addTransaction: (tx) => {
    repo.addTransaction(tx);
    set({ transactions: repo.getSnapshot().transactions });
  },
  setCategory: (id, cat) => {
    repo.updateTransaction(id, { cat });
    set({ transactions: repo.getSnapshot().transactions });
  },
  deleteTransaction: (id) => {
    repo.deleteTransaction(id);
    set({ transactions: repo.getSnapshot().transactions });
  },
  fileSms: (id) => {
    set({ smsInbox: get().smsInbox.map((s) => (s.id === id ? { ...s, filed: true } : s)) });
  },
  setSmsCategory: (id, cat) => {
    set({ smsInbox: get().smsInbox.map((s) => (s.id === id ? { ...s, cat } : s)) });
  },
}));
