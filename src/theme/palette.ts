import { formatHex, type Oklch } from 'culori';

import type { BankKey, CategoryKey } from '@/lib/data/keys';

// Category & bank brand colors, authored in OKLCH with shared chroma/lightness
// so the set harmonizes, then serialized to hex for React Native. The data
// layer references these by key; components tint them against a surface.
function ok(l: number, c: number, h: number): string {
  const color: Oklch = { mode: 'oklch', l, c, h };
  return formatHex(color) ?? '#000000';
}

const CAT_C = 0.13;
const CAT_L = 0.66;

export const categoryColors: Record<CategoryKey, string> = {
  food: ok(CAT_L, CAT_C, 42), // warm orange
  groceries: ok(CAT_L, CAT_C, 140), // green
  transport: ok(CAT_L, CAT_C, 248), // blue
  shopping: ok(CAT_L, CAT_C, 352), // pink
  bills: ok(CAT_L, CAT_C, 300), // purple
  airtime: ok(CAT_L, CAT_C, 280), // violet
  health: ok(CAT_L, CAT_C, 178), // teal
  fun: ok(CAT_L, CAT_C, 72), // amber
  transfer: ok(CAT_L, CAT_C, 214), // cyan-blue
  rent: ok(CAT_L, CAT_C, 56), // ochre
  income: ok(CAT_L, CAT_C, 152), // green (positive)
};

// Bank monogram colors — deeper so the avatars read as brand marks (no logos).
const BANK_C = 0.12;
const BANK_L = 0.58;

export const bankColors: Record<BankKey, string> = {
  cbe: ok(BANK_L, BANK_C, 300), // CBE — purple
  boa: ok(BANK_L, BANK_C, 70), // Abyssinia — gold
  telebirr: ok(BANK_L, BANK_C, 250), // telebirr — blue
  mpesa: ok(BANK_L, BANK_C, 150), // M-PESA — green
  awash: ok(BANK_L, BANK_C, 228), // Awash — blue
  cbebirr: ok(BANK_L, BANK_C, 326), // CBE Birr — magenta
};
