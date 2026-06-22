import type { CategoryKey } from '@/lib/data/keys';

import { categorize } from './categorize';

describe('categorize', () => {
  it.each<[string, CategoryKey]>([
    ['SHOA SUPERMARKET BOLE', 'groceries'],
    ["Queen's Supermarket", 'groceries'],
    ["Kaldi's Coffee", 'food'],
    ['Yod Abyssinia', 'food'],
    ['Edna Mall', 'shopping'],
    ['Ethio Telecom', 'airtime'],
    ['Feres Ride', 'transport'],
    ['Ethiopian Electric', 'bills'],
    ['DStv Premium', 'bills'],
    ['Getfam Pharmacy', 'health'],
    ['Noah Real Estate', 'rent'],
    ['SALARY ROHA TECH', 'income'],
  ])('%s → %s', (merchant, cat) => {
    expect(categorize(merchant)).toBe(cat);
  });

  it('honors a user override', () => {
    expect(categorize('Edna Mall', { 'edna mall': 'food' })).toBe('food');
  });

  it('falls back to transfer for unknown merchants', () => {
    expect(categorize('Zxqw Holdings 9001')).toBe('transfer');
  });
});
