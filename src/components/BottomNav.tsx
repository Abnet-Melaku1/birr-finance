import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { fabElevation, radii, useTheme } from '@/theme';

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
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: t.navBg,
        paddingTop: 8,
        paddingBottom: insets.bottom + 6,
        borderTopWidth: t.mode === 'dark' ? 1 : 0,
        borderTopColor: t.hairline,
      }}
    >
      {TABS.slice(0, 2).map((tab) => (
        <TabItem
          key={tab.key}
          tab={tab}
          active={active === tab.key}
          onPress={() => onSelect(tab.key)}
        />
      ))}

      <View style={{ flex: 1, alignItems: 'center' }}>
        <Pressable
          onPress={onAdd}
          accessibilityRole="button"
          accessibilityLabel="Add transaction"
          style={({ pressed }) => ({
            width: 56,
            height: 56,
            borderRadius: radii.fab,
            backgroundColor: t.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -24,
            opacity: pressed ? 0.85 : 1,
            ...fabElevation(t),
          })}
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
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      style={{ flex: 1, alignItems: 'center', gap: 3 }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 5,
          borderRadius: radii.pill,
          backgroundColor: active ? t.primarySoft : 'transparent',
        }}
      >
        <Icon name={tab.icon} color={color} size={20} />
      </View>
      <AppText variant="micro" color={color}>
        {tab.label}
      </AppText>
    </Pressable>
  );
}
