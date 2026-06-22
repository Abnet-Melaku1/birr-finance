import { extractEtb, extractLabelled } from '../amount';
import type { BankParser, ParsedSms } from '../types';

const DIR = /has been (debited|credited)/i;

export const cbeParser: BankParser = {
  bank: 'cbe',
  senderIds: ['CBE'],

  match: (raw) => DIR.test(raw) && /\bCBE\b|your account/i.test(raw),

  parse(raw): ParsedSms | null {
    const dirM = DIR.exec(raw);
    const amount = extractEtb(raw);
    if (!dirM || amount == null) return null;

    const merchant = /\bat ([^.]+?)\./i.exec(raw)?.[1]?.trim();
    if (!merchant) return null;

    return {
      bank: 'cbe',
      acct: /account (\w+)/i.exec(raw)?.[1],
      dir: (dirM[1] ?? '').toLowerCase() === 'credited' ? 'in' : 'out',
      amount,
      merchant,
      balance: extractLabelled(raw, /Current Balance ETB\s*([\d,]+(?:\.\d{1,2})?)/i) ?? undefined,
      at: /on (\d{2}\/\d{2}\/\d{4})/.exec(raw)?.[1],
      raw,
    };
  },
};
