/**
 * Domain key unions (CLAUDE.md §5.2–§5.3). Kept in one tiny module so the
 * theme palette, data layer, and parser all share the exact same string keys.
 */
export type CategoryKey =
  | 'food'
  | 'groceries'
  | 'transport'
  | 'shopping'
  | 'bills'
  | 'airtime'
  | 'health'
  | 'fun'
  | 'transfer'
  | 'rent'
  | 'income';

export type BankKey = 'cbe' | 'boa' | 'telebirr' | 'mpesa' | 'awash' | 'cbebirr';

/** Money direction: into an account (income) or out of it (spend/transfer). */
export type Direction = 'in' | 'out';
