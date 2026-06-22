import { fmt } from './fmt';
import { birr } from './Money';

describe('fmt', () => {
  it.each<[string, number, Parameters<typeof fmt>[1], string]>([
    ['whole birr with thousands', birr(12500), undefined, 'Br 12,500'],
    ['millions group correctly', birr(1234567), undefined, 'Br 1,234,567'],
    ['small value', birr(850), undefined, 'Br 850'],
    ['zero', 0, undefined, 'Br 0'],
    ['negative uses unicode minus', birr(-850), undefined, '−Br 850'],
    ['sign:true adds plus', birr(4500), { sign: true }, '+Br 4,500'],
    ['sign:true on zero stays unsigned', 0, { sign: true }, 'Br 0'],
    ['sign:true on negative still minus', birr(-300), { sign: true }, '−Br 300'],
    ['two decimals from santim', birr(1925, 50), { decimals: 2 }, 'Br 1,925.50'],
    ['rounds at 0 decimals', birr(12500, 60), undefined, 'Br 12,501'],
  ])('%s', (_label, amount, options, expected) => {
    expect(fmt(amount, options)).toBe(expected);
  });

  it('uses the unicode minus U+2212, not a hyphen', () => {
    expect(fmt(birr(-1))).toContain('−');
    expect(fmt(birr(-1))).not.toContain('-');
  });
});
