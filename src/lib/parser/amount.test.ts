import { extractEtb, toSantim } from './amount';

describe('toSantim', () => {
  it.each<[string, number]>([
    ['850.00', 85000],
    ['1,925.00', 192500],
    ['28,000.00', 2800000],
    ['78', 7800],
    ['1,234.5', 123450],
    ['0.00', 0],
  ])('%s → %d santim', (input, expected) => {
    expect(toSantim(input)).toBe(expected);
  });

  it('avoids floating-point error', () => {
    expect(toSantim('0.10') + toSantim('0.20')).toBe(toSantim('0.30'));
  });
});

describe('extractEtb', () => {
  it('grabs the first ETB amount', () => {
    expect(extractEtb('debited ETB 850.00 on 09/06/2026. Balance ETB 42,850.00')).toBe(85000);
  });
  it('returns null when no ETB amount is present', () => {
    expect(extractEtb('Your OTP is 123456')).toBeNull();
  });
});
