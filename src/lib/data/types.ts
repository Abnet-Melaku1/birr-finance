import type { IconName } from '@/components/Icon';

import type { Money } from '../money';

import type { BankKey, CategoryKey, Direction } from './keys';

export type { BankKey, CategoryKey, Direction };

export type AccountType = 'bank' | 'savings' | 'wallet';

export interface User {
  name: string;
  full: string;
  initials: string;
  month: string;
}

export interface Account {
  id: string;
  bank: BankKey;
  name: string;
  number: string; // masked
  balance: Money;
  type: AccountType;
}

export interface Category {
  key: CategoryKey;
  label: string;
  icon: IconName;
  color: string;
}

export interface Bank {
  key: BankKey;
  label: string;
  full: string;
  mono: string; // single-char monogram
  color: string;
}

export interface Tx {
  id: string;
  d: number; // day of month, 1–30
  t: string; // "HH:MM"
  dir: Direction;
  amount: Money;
  cat: CategoryKey;
  acct: string; // account id
  merchant: string;
  parsed: boolean;
  bank: BankKey;
  raw?: string; // original SMS when parsed
}

export interface SmsInbox {
  id: string;
  bank: BankKey;
  time: string; // "2 min ago"
  dir: Direction;
  amount: Money;
  cat: CategoryKey;
  merchant: string;
  raw: string;
  filed?: boolean;
}

export interface Budget {
  cat: CategoryKey;
  limit: Money;
  spent: Money;
}

export interface Bill {
  id: string;
  name: string;
  cat: CategoryKey;
  amount: Money;
  due: string;
  every: string; // cadence, e.g. "Monthly"
  acct: string;
}

export interface Goal {
  id: string;
  name: string;
  target: Money;
  saved: Money;
  color: string;
  icon: IconName;
  eta: string;
}

export interface History {
  m: string; // "Jan"
  income: Money;
  expense: Money;
}
