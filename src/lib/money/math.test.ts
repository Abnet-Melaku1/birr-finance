import { budgetRatio, clamp, fraction, net, savingsRate, sum } from './math';
import { birr } from './Money';

describe('sum', () => {
  it('adds money values (integer-safe)', () => {
    expect(sum([birr(10), birr(20), birr(5)])).toBe(birr(35));
  });
  it('is 0 for an empty list', () => {
    expect(sum([])).toBe(0);
  });
});

describe('budgetRatio', () => {
  it('returns spent/limit', () => {
    expect(budgetRatio(birr(1500), birr(3000))).toBeCloseTo(0.5);
  });
  it('exceeds 1 when over budget', () => {
    expect(budgetRatio(birr(3200), birr(3000))).toBeGreaterThan(1);
  });
  it('is 0 for a non-positive limit', () => {
    expect(budgetRatio(birr(100), 0)).toBe(0);
  });
});

describe('fraction', () => {
  it('returns part/whole', () => {
    expect(fraction(birr(40), birr(160))).toBeCloseTo(0.25);
  });
  it('is 0 when whole is 0', () => {
    expect(fraction(birr(10), 0)).toBe(0);
  });
});

describe('net & savingsRate', () => {
  it('net subtracts expense from income', () => {
    expect(net(birr(32500), birr(16343))).toBe(birr(16157));
  });
  it('savingsRate is clamped to [0,1]', () => {
    expect(savingsRate(birr(1000), birr(400))).toBeCloseTo(0.6);
    expect(savingsRate(birr(1000), birr(1500))).toBe(0);
    expect(savingsRate(0, birr(100))).toBe(0);
  });
});

describe('clamp', () => {
  it('bounds a value', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-2, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
  });
});
