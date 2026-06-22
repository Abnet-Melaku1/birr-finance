import { Tabs, useRouter } from 'expo-router';
import type { ComponentProps } from 'react';

import { BottomNav, type TabKey } from '@/components';

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const ROUTE_TO_TAB: Record<string, TabKey> = {
  index: 'home',
  transactions: 'transactions',
  planner: 'planner',
  analytics: 'analytics',
};

const TAB_TO_ROUTE: Record<TabKey, string> = {
  home: 'index',
  transactions: 'transactions',
  planner: 'planner',
  analytics: 'analytics',
};

function AppTabBar({ state, navigation }: TabBarProps) {
  const router = useRouter();
  const current = state.routes[state.index]?.name ?? 'index';
  const active = ROUTE_TO_TAB[current] ?? 'home';

  return (
    <BottomNav
      active={active}
      onSelect={(key) => navigation.navigate(TAB_TO_ROUTE[key])}
      onAdd={() => router.push('/add')}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <AppTabBar {...props} />}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="transactions" />
      <Tabs.Screen name="planner" />
      <Tabs.Screen name="analytics" />
    </Tabs>
  );
}
