import Feather from '@expo/vector-icons/Feather';
import type { ComponentProps } from 'react';

import type { CategoryKey } from '@/lib/data/keys';

type FeatherName = ComponentProps<typeof Feather>['name'];

// Semantic names the app uses; category keys double as their own icon names.
export type IconName =
  | 'home'
  | 'activity'
  | 'planner'
  | 'insights'
  | 'plus'
  | 'chevronLeft'
  | 'chevronRight'
  | 'bell'
  | 'eye'
  | 'eyeOff'
  | 'scan'
  | 'shield'
  | 'check'
  | 'edit'
  | 'trash'
  | 'close'
  | 'arrowDown'
  | 'arrowUp'
  | 'wallet'
  | 'target'
  | 'settings'
  | 'calendar'
  | 'sun'
  | 'moon'
  | 'search'
  | 'zap'
  | 'clock'
  | CategoryKey;

const GLYPHS: Record<IconName, FeatherName> = {
  home: 'home',
  activity: 'list',
  planner: 'calendar',
  insights: 'pie-chart',
  plus: 'plus',
  chevronLeft: 'chevron-left',
  chevronRight: 'chevron-right',
  bell: 'bell',
  eye: 'eye',
  eyeOff: 'eye-off',
  scan: 'maximize',
  shield: 'shield',
  check: 'check',
  edit: 'edit-2',
  trash: 'trash-2',
  close: 'x',
  arrowDown: 'arrow-down',
  arrowUp: 'arrow-up',
  wallet: 'credit-card',
  target: 'target',
  settings: 'settings',
  calendar: 'calendar',
  sun: 'sun',
  moon: 'moon',
  search: 'search',
  zap: 'zap',
  clock: 'clock',
  // categories
  food: 'coffee',
  groceries: 'shopping-cart',
  transport: 'truck',
  shopping: 'shopping-bag',
  bills: 'file-text',
  airtime: 'smartphone',
  health: 'heart',
  fun: 'film',
  transfer: 'repeat',
  rent: 'home',
  income: 'trending-up',
};

export interface IconProps {
  name: IconName;
  color: string;
  size?: number;
}

export function Icon({ name, color, size = 20 }: IconProps) {
  return <Feather name={GLYPHS[name]} size={size} color={color} />;
}
