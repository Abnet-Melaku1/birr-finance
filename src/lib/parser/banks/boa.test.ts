import { boaParser } from './boa';

const CREDIT =
  'Your BOA account 0150xxxx2231 has been credited ETB 28,000.00 - SALARY ROHA TECH. Available balance ETB 71,400.00.';

describe('boaParser', () => {
  it('parses a salary credit', () => {
    expect(boaParser.parse(CREDIT)).toMatchObject({
      bank: 'boa',
      dir: 'in',
      amount: 2800000,
      merchant: 'SALARY ROHA TECH',
      balance: 7140000,
      acct: '0150xxxx2231',
    });
  });

  it('returns null for a marketing message', () => {
    expect(boaParser.parse('BOA: Enjoy zero fees this weekend on all transfers!')).toBeNull();
  });
});
