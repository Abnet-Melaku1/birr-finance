import { SANTIM_PER_BIRR, type Money } from './Money';

const MINUS = '−'; // U+2212, not a hyphen

export interface FmtOptions {
  sign?: boolean;
  decimals?: number;
}

function groupThousands(intPart: string): string {
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/** Santim → `Br 12,500` / `+Br 4,500` / `−Br 850`. Default 0 decimals. */
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
