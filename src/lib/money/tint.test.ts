import { formatHex } from 'culori';

import { tint } from './tint';

const COLOR = '#D85C32'; // primary orange
const SURFACE = '#FFFFFF';

describe('tint', () => {
  it('at 0% returns the surface color', () => {
    expect(tint(COLOR, SURFACE, 0)).toBe(formatHex(SURFACE));
  });

  it('at 100% returns the source color', () => {
    expect(tint(COLOR, SURFACE, 100)).toBe(formatHex(COLOR));
  });

  it('at 15% yields a soft tint distinct from both endpoints', () => {
    const soft = tint(COLOR, SURFACE, 15);
    expect(soft).not.toBe(formatHex(SURFACE));
    expect(soft).not.toBe(formatHex(COLOR));
    expect(soft).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('is deterministic / memoized (same inputs → same output)', () => {
    expect(tint(COLOR, SURFACE, 24)).toBe(tint(COLOR, SURFACE, 24));
  });
});
