import type { CategoryKey } from '@/lib/data/keys';

import { RULES } from './rules';

/**
 * Map a merchant string to a category. A user override (keyed by lowercased
 * merchant) wins over the keyword rules; unknown merchants fall back to
 * 'transfer' and stay editable in the UI.
 */
export function categorize(
  merchant: string,
  overrides: Record<string, CategoryKey> = {},
): CategoryKey {
  const override = overrides[merchant.trim().toLowerCase()];
  if (override) return override;

  for (const { re, cat } of RULES) {
    if (re.test(merchant)) return cat;
  }
  return 'transfer';
}
