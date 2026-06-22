/**
 * Money is an integer count of **santim** (ETB minor units): 100 santim = 1 Br.
 * Never a float — currency math is integer-only (docs/conventions.md §1). Use
 * `fmt()` for display.
 */
export type Money = number;

export const SANTIM_PER_BIRR = 100;

/** Build a Money value from whole birr + santim (helper for fixtures/parsers). */
export function birr(whole: number, santim = 0): Money {
  return Math.round(whole) * SANTIM_PER_BIRR + santim;
}
