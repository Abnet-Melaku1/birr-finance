import { create } from 'zustand';

import { mockRepo, type DataRepo, type DataSnapshot } from '@/lib/data/repo';
import type { CategoryKey, Tx } from '@/lib/data/types';

const repo: DataRepo = mockRepo;

interface DataState extends DataSnapshot {
  addTransaction: (tx: Tx) => void;
  setCategory: (id: string, cat: CategoryKey) => void;
  deleteTransaction: (id: string) => void;
  fileSms: (id: string) => void;
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
}));
