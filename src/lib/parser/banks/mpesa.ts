import { extractEtb, extractLabelled } from '../amount';
import type { BankParser, ParsedSms } from '../types';

const DIR = /\b(paid|sent|received)\b/i;

export const mpesaParser: BankParser = {
  bank: 'mpesa',
  senderIds: ['M-PESA', 'MPESA'],

  match: (raw) => /M-?PESA/i.test(raw) && DIR.test(raw),

  parse(raw): ParsedSms | null {
    const dirM = DIR.exec(raw);
    const amount = extractEtb(raw);
    if (!dirM || amount == null) return null;

    const merchant = /(?:paid|sent) to ([^.]+?) on|received from ([^.]+?) on/i
      .exec(raw)
      ?.slice(1)
      .find(Boolean)
      ?.trim();
    if (!merchant) return null;

    return {
      bank: 'mpesa',
      dir: (dirM[1] ?? '').toLowerCase() === 'received' ? 'in' : 'out',
      amount,
      merchant,
      balance:
        extractLabelled(raw, /M-?PESA balance is ETB\s*([\d,]+(?:\.\d{1,2})?)/i) ?? undefined,
      ref: /Ref (\w+)/i.exec(raw)?.[1],
      raw,
    };
  },
};
