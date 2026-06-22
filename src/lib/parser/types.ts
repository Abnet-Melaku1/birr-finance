import type { BankKey, Direction } from '@/lib/data/keys';

import type { Money } from '../money';

export type { Direction };

export interface ParsedSms {
  bank: BankKey;
  acct?: string;
  dir: Direction;
  amount: Money; // integer santim
  merchant: string;
  balance?: Money;
  ref?: string;
  at?: string;
  raw: string;
}

export interface BankParser {
  bank: BankKey;
  senderIds: string[];
  match(raw: string): boolean;
  parse(raw: string): ParsedSms | null;
}
