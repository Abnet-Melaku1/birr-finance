import { categoryColors } from '@/theme';

import type { CategoryKey } from './keys';
import type { Category } from './types';

export const CATEGORIES: Record<CategoryKey, Category> = {
  food: { key: 'food', label: 'Food & Dining', icon: 'food', color: categoryColors.food },
  groceries: {
    key: 'groceries',
    label: 'Groceries',
    icon: 'groceries',
    color: categoryColors.groceries,
  },
  transport: {
    key: 'transport',
    label: 'Transport',
    icon: 'transport',
    color: categoryColors.transport,
  },
  shopping: {
    key: 'shopping',
    label: 'Shopping',
    icon: 'shopping',
    color: categoryColors.shopping,
  },
  bills: { key: 'bills', label: 'Bills & Utilities', icon: 'bills', color: categoryColors.bills },
  airtime: {
    key: 'airtime',
    label: 'Airtime & Data',
    icon: 'airtime',
    color: categoryColors.airtime,
  },
  health: { key: 'health', label: 'Health', icon: 'health', color: categoryColors.health },
  fun: { key: 'fun', label: 'Entertainment', icon: 'fun', color: categoryColors.fun },
  transfer: {
    key: 'transfer',
    label: 'Transfers',
    icon: 'transfer',
    color: categoryColors.transfer,
  },
  rent: { key: 'rent', label: 'Rent & Home', icon: 'rent', color: categoryColors.rent },
  income: { key: 'income', label: 'Income', icon: 'income', color: categoryColors.income },
};

export const CATEGORY_LIST: Category[] = Object.values(CATEGORIES);
