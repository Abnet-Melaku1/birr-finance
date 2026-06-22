import { openDatabaseSync, type SQLiteDatabase } from 'expo-sqlite';
import { z } from 'zod';

import type { BankKey, CategoryKey } from '../keys';
import { ACCOUNTS, BILLS, BUDGETS, GOALS, HISTORY, SMS_INBOX, TRANSACTIONS, USER } from '../mock';
import type { DataRepo, DataSnapshot } from '../repo';
import type { Tx } from '../types';

const DDL = `CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  d INTEGER NOT NULL,
  t TEXT NOT NULL,
  dir TEXT NOT NULL,
  amount INTEGER NOT NULL,
  cat TEXT NOT NULL,
  acct TEXT NOT NULL,
  merchant TEXT NOT NULL,
  parsed INTEGER NOT NULL,
  bank TEXT NOT NULL,
  raw TEXT
);`;

const RowSchema = z.object({
  id: z.string(),
  d: z.number().int(),
  t: z.string(),
  dir: z.enum(['in', 'out']),
  amount: z.number().int(),
  cat: z.string(),
  acct: z.string(),
  merchant: z.string(),
  parsed: z.number().int(),
  bank: z.string(),
  raw: z.string().nullable(),
});

function rowToTx(row: unknown): Tx | null {
  const r = RowSchema.safeParse(row);
  if (!r.success) return null;
  const { parsed, raw, cat, bank, ...rest } = r.data;
  return {
    ...rest,
    cat: cat as CategoryKey,
    bank: bank as BankKey,
    parsed: parsed === 1,
    ...(raw ? { raw } : {}),
  };
}

function upsert(db: SQLiteDatabase, tx: Tx): void {
  db.runSync(
    `INSERT OR REPLACE INTO transactions
       (id, d, t, dir, amount, cat, acct, merchant, parsed, bank, raw)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    tx.id,
    tx.d,
    tx.t,
    tx.dir,
    tx.amount,
    tx.cat,
    tx.acct,
    tx.merchant,
    tx.parsed ? 1 : 0,
    tx.bank,
    tx.raw ?? null,
  );
}

/** SQLite-backed repo. Seeds from the mock dataset on first run. */
export function createSqliteRepo(): DataRepo {
  const db = openDatabaseSync('birr.db');
  db.execSync(DDL);

  const count = db.getFirstSync<{ c: number }>('SELECT COUNT(*) AS c FROM transactions');
  if (!count || count.c === 0) {
    for (const tx of TRANSACTIONS) upsert(db, tx);
  }

  const readAll = (): Tx[] => {
    const rows = db.getAllSync('SELECT * FROM transactions ORDER BY d DESC, t DESC');
    return rows.map(rowToTx).filter((x): x is Tx => x !== null);
  };

  return {
    getSnapshot: (): DataSnapshot => ({
      user: USER,
      accounts: ACCOUNTS,
      transactions: readAll(),
      smsInbox: SMS_INBOX,
      budgets: BUDGETS,
      bills: BILLS,
      goals: GOALS,
      history: HISTORY,
    }),
    addTransaction: (tx) => upsert(db, tx),
    updateTransaction: (id, patch) => {
      const current = rowToTx(db.getFirstSync(`SELECT * FROM transactions WHERE id = ?`, id));
      if (current) upsert(db, { ...current, ...patch });
    },
    deleteTransaction: (id) => {
      db.runSync('DELETE FROM transactions WHERE id = ?', id);
    },
  };
}
