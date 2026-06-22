import { extractEtb, extractLabelled } from '../amount';
import type { BankParser, ParsedSms } from '../types';

const DIR = /(transferred|sent|received)/i;

export const telebirrParser: BankParser = {
  bank: 'telebirr',
  senderIds: ['telebirr', '127'],

  match: (raw) => /telebirr/i.test(raw) && DIR.test(raw),

  parse(raw): ParsedSms | null {
    const dirM = DIR.exec(raw);
    const amount = extractEtb(raw);
    if (!dirM || amount == null) return null;

    const isIn = (dirM[1] ?? '').toLowerCase() === 'received';
    const merchant = isIn
      ? /from ([^.(]+?)\s*(?:\(|\.)/i.exec(raw)?.[1]?.trim()
      : /to ([^.]+?)\./i.exec(raw)?.[1]?.trim();
    if (!merchant) return null;

    return {
      bank: 'telebirr',
      dir: isIn ? 'in' : 'out',
      amount,
      merchant,
      balance:
        extractLabelled(raw, /telebirr balance is ETB\s*([\d,]+(?:\.\d{1,2})?)/i) ?? undefined,
      ref: /Ref (\w+)/i.exec(raw)?.[1],
      raw,
    };
  },
};
