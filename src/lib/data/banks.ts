import { bankColors } from '@/theme';

import type { BankKey } from './keys';
import type { Bank } from './types';

export const BANKS: Record<BankKey, Bank> = {
  cbe: {
    key: 'cbe',
    label: 'CBE',
    full: 'Commercial Bank of Ethiopia',
    mono: 'C',
    color: bankColors.cbe,
  },
  boa: { key: 'boa', label: 'BOA', full: 'Bank of Abyssinia', mono: 'B', color: bankColors.boa },
  telebirr: {
    key: 'telebirr',
    label: 'telebirr',
    full: 'telebirr',
    mono: 'T',
    color: bankColors.telebirr,
  },
  mpesa: { key: 'mpesa', label: 'M-PESA', full: 'M-PESA', mono: 'M', color: bankColors.mpesa },
  awash: { key: 'awash', label: 'Awash', full: 'Awash Bank', mono: 'A', color: bankColors.awash },
  cbebirr: {
    key: 'cbebirr',
    label: 'CBE Birr',
    full: 'CBE Birr',
    mono: 'C',
    color: bankColors.cbebirr,
  },
};

export const BANK_LIST: Bank[] = Object.values(BANKS);
