// Shared domain key unions (palette, data layer, parser all import these).
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

export type Direction = 'in' | 'out';
