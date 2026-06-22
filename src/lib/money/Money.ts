/** Integer santim (ETB minor units): 100 santim = 1 Br. Never a float. */
export type Money = number;

export const SANTIM_PER_BIRR = 100;

export function birr(whole: number, santim = 0): Money {
  return Math.round(whole) * SANTIM_PER_BIRR + santim;
}
