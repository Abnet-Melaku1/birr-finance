import { cbeParser } from './cbe';

const DEBIT =
  'Dear ABNET, your account 1000xxxx4789 has been debited ETB 850.00 on 09/06/2026 at SHOA SUPERMARKET BOLE. Current Balance ETB 42,850.00. Thank you for banking with CBE.';

describe('cbeParser', () => {
  it('parses a debit', () => {
    expect(cbeParser.parse(DEBIT)).toMatchObject({
      bank: 'cbe',
      dir: 'out',
      amount: 85000,
      merchant: 'SHOA SUPERMARKET BOLE',
      balance: 4285000,
      acct: '1000xxxx4789',
      at: '09/06/2026',
    });
  });

  it('returns null for a non-transaction (OTP)', () => {
    expect(cbeParser.parse('Your CBE one-time password is 482913. Do not share it.')).toBeNull();
  });
});
