import { TRANSACTIONS } from '@/lib/data/mock';

import { parseSms } from './registry';

describe('parseSms', () => {
  it('routes by content when no sender is given', () => {
    const p = parseSms(
      'Confirmed. ETB 78.00 paid to KALDIS COFFEE on 09/06/26 at 7:55 AM. New M-PESA balance is ETB 1,925.00. Ref X.',
    );
    expect(p?.bank).toBe('mpesa');
  });

  it('prefers the parser mapped to the sender id', () => {
    const p = parseSms(
      'Your BOA account 0150xxxx2231 has been credited ETB 28,000.00 - SALARY ROHA TECH. Available balance ETB 71,400.00.',
      'BOA',
    );
    expect(p?.bank).toBe('boa');
  });

  it('returns null for a non-transaction text', () => {
    expect(parseSms('Welcome to Birr! Reply STOP to opt out.')).toBeNull();
  });

  it('reproduces direction, amount, and bank for every parsed mock transaction', () => {
    for (const tx of TRANSACTIONS) {
      if (!tx.parsed || !tx.raw) continue;
      const p = parseSms(tx.raw);
      expect(p).not.toBeNull();
      expect(p?.dir).toBe(tx.dir);
      expect(p?.amount).toBe(tx.amount);
      expect(p?.bank).toBe(tx.bank);
    }
  });
});
