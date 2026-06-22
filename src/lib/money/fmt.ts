import { SANTIM_PER_BIRR, type Money } from './Money';

/** Unicode minus (U+2212), per the hard rules — not a hyphen-minus. */
const MINUS = '−';

export interface FmtOptions {
  /** Show a leading '+' for positive values (default false). */
  sign?: boolean;
  /** Fractional digits to display (default 0 — whole birr). */
  decimals?: number;
}

/** Insert thousands separators into an integer string (Hermes-safe; no Intl). */
function groupThousands(intPart: string): string {
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format santim as Ethiopian Birr: `Br 12,500` / `+Br 4,500` / `−Br 850`
 * (CLAUDE.md §2.6, docs/theme.md). Rounds to `decimals`; default 0.
 * Implemented without Intl so it's identical under Hermes and in tests.
 */
export function fmt(amount: Money, options: FmtOptions = {}): string {
  const { sign = false, decimals = 0 } = options;

  const negative = amount < 0;
  const fixed = (Math.abs(amount) / SANTIM_PER_BIRR).toFixed(decimals);
  const [intPart, fracPart] = fixed.split('.');
  const grouped = groupThousands(intPart ?? '0');
  const body = fracPart ? `${grouped}.${fracPart}` : grouped;

  const prefix = negative ? MINUS : sign && amount > 0 ? '+' : '';
  return `${prefix}Br ${body}`;
}
