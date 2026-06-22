import { extractEtb, extractLabelled } from '../amount';
import type { BankParser, ParsedSms } from '../types';

const DIR = /has been (debited|credited)/i;

export const boaParser: BankParser = {
  bank: 'boa',
  senderIds: ['BOA', 'Abyssinia'],

  match: (raw) => /BOA account/i.test(raw) && DIR.test(raw),

  parse(raw): ParsedSms | null {
    const dirM = DIR.exec(raw);
    const amount = extractEtb(raw);
    if (!dirM || amount == null) return null;

    const merchant = /-\s*([^.]+?)\./.exec(raw)?.[1]?.trim();
    if (!merchant) return null;

    return {
      bank: 'boa',
      acct: /account (\w+)/i.exec(raw)?.[1],
      dir: (dirM[1] ?? '').toLowerCase() === 'credited' ? 'in' : 'out',
      amount,
      merchant,
      balance: extractLabelled(raw, /Available balance ETB\s*([\d,]+(?:\.\d{1,2})?)/i) ?? undefined,
      raw,
    };
  },
};
