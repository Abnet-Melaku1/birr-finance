import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { fabElevation, useTheme } from '@/theme';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';

export type TabKey = 'home' | 'transactions' | 'planner' | 'analytics';

const TABS: { key: TabKey; label: string; icon: IconName }[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'transactions', label: 'Activity', icon: 'activity' },
  { key: 'planner', label: 'Planner', icon: 'planner' },
  { key: 'analytics', label: 'Insights', icon: 'insights' },
];

export interface BottomNavProps {
  active: TabKey;
  onSelect: (key: TabKey) => void;
  onAdd: () => void;
}

export function BottomNav({ active, onSelect, onAdd }: BottomNavProps) {
  const t = useTheme();
  return (
    <View style={styles.bar}>
      {TABS.slice(0, 2).map((tab) => (
        <TabItem
          key={tab.key}
          tab={tab}
          active={active === tab.key}
          onPress={() => onSelect(tab.key)}
        />
      ))}

      <View style={styles.fabSlot}>
        <Pressable
          onPress={onAdd}
          accessibilityRole="button"
          accessibilityLabel="Add transaction"
          style={({ pressed }) => [styles.fab, pressed && styles.pressed]}
        >
          <Icon name="plus" color={t.onPrimary} size={26} />
        </Pressable>
      </View>

      {TABS.slice(2).map((tab) => (
        <TabItem
          key={tab.key}
          tab={tab}
          active={active === tab.key}
          onPress={() => onSelect(tab.key)}
        />
      ))}
    </View>
  );
}

function TabItem({
  tab,
  active,
  onPress,
}: {
  tab: (typeof TABS)[number];
  active: boolean;
  onPress: () => void;
}) {
  const t = useTheme();
  const color = active ? t.primary : t.sub;
  styles.useVariants({ active });
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      style={styles.tab}
    >
      <View style={styles.pill}>
        <Icon name={tab.icon} color={color} size={20} />
      </View>
      <AppText variant="micro" color={color}>
        {tab.label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.navBg,
    paddingTop: 8,
    paddingBottom: rt.insets.bottom + 6,
    borderTopWidth: theme.mode === 'dark' ? 1 : 0,
    borderTopColor: theme.hairline,
  },
  fabSlot: { flex: 1, alignItems: 'center' },
  fab: {
    width: 56,
    height: 56,
    borderRadius: theme.radii.fab,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
    ...fabElevation(theme),
  },
  pressed: { opacity: 0.85 },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: theme.radii.pill,
    variants: {
      active: {
        true: { backgroundColor: theme.primarySoft },
        false: { backgroundColor: 'transparent' },
      },
    },
  },
}));
