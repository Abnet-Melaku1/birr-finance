import { mpesaParser } from './mpesa';

const PAID =
  'Confirmed. ETB 78.00 paid to KALDIS COFFEE on 09/06/26 at 7:55 AM. New M-PESA balance is ETB 1,925.00. Ref QGR4T8KLP0.';

describe('mpesaParser', () => {
  it('parses a payment', () => {
    expect(mpesaParser.parse(PAID)).toMatchObject({
      bank: 'mpesa',
      dir: 'out',
      amount: 7800,
      merchant: 'KALDIS COFFEE',
      balance: 192500,
      ref: 'QGR4T8KLP0',
    });
  });

  it('returns null for a balance-check reply', () => {
    expect(mpesaParser.parse('Your M-PESA balance is ETB 1,925.00 as of today.')).toBeNull();
  });
});
