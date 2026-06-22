import type { CategoryKey } from '@/lib/data/keys';

// Ordered keyword → category rules; first match wins.
export const RULES: { re: RegExp; cat: CategoryKey }[] = [
  { re: /salary|payroll|roha tech/i, cat: 'income' },
  { re: /super\s?market|grocery|fresh|queen|\bmarket\b/i, cat: 'groceries' },
  { re: /coffee|cafe|kaldi|restaurant|abyssinia|yod|burger|pizza|dining/i, cat: 'food' },
  { re: /mall|boutique|edna|sheger|store|\bshop\b/i, cat: 'shopping' },
  { re: /telecom|airtime|\bdata\b|safaricom/i, cat: 'airtime' },
  { re: /feres|\bride\b|taxi|\bbus\b|transport|uber|bolt/i, cat: 'transport' },
  { re: /electric|water|dstv|internet|utility|power/i, cat: 'bills' },
  { re: /pharmacy|hospital|clinic|health|medical|getfam/i, cat: 'health' },
  { re: /rent|real estate|apartment|noah/i, cat: 'rent' },
];
