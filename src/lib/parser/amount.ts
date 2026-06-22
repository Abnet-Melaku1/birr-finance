import type { Money } from '../money';

const ETB_RE = /ETB\s*([\d,]+(?:\.\d{1,2})?)/i;

/** "1,925.00" → 192500 santim. Integer math only — never parseFloat. */
export function toSantim(numStr: string): Money {
  const [whole = '0', frac = ''] = numStr.replace(/,/g, '').split('.');
  const cents = frac.padEnd(2, '0').slice(0, 2);
  return Number(whole) * 100 + Number(cents);
}

/** First `ETB <number>` in the text as santim, or null. */
export function extractEtb(text: string): Money | null {
  const m = ETB_RE.exec(text);
  if (!m || !m[1]) return null;
  return toSantim(m[1]);
}

/** Amount that follows a labelled phrase, e.g. "balance is ETB 3,140.00". */
export function extractLabelled(text: string, label: RegExp): Money | null {
  const m = label.exec(text);
  if (!m || !m[1]) return null;
  return toSantim(m[1]);
}
