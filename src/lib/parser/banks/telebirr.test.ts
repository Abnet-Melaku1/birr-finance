import { telebirrParser } from './telebirr';

const OUT =
  'You have transferred ETB 220.00 to FERES TECHNOLOGIES. Service fee ETB 0.00. Your telebirr balance is ETB 3,140.00. Ref CL8H2K9D.';
const IN =
  'You have received ETB 4,500.00 from TIGIST A (2519xxxx3321). Your telebirr balance is ETB 4,860.00. Ref CL2290KK.';

describe('telebirrParser', () => {
  it('parses an outgoing transfer (ignoring the service fee)', () => {
    expect(telebirrParser.parse(OUT)).toMatchObject({
      bank: 'telebirr',
      dir: 'out',
      amount: 22000,
      merchant: 'FERES TECHNOLOGIES',
      balance: 314000,
      ref: 'CL8H2K9D',
    });
  });

  it('parses an incoming transfer', () => {
    expect(telebirrParser.parse(IN)).toMatchObject({
      bank: 'telebirr',
      dir: 'in',
      amount: 450000,
      merchant: 'TIGIST A',
      ref: 'CL2290KK',
    });
  });

  it('returns null for a verification code', () => {
    expect(telebirrParser.parse('Your telebirr verification code is 9921.')).toBeNull();
  });
});
