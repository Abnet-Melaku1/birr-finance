import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { space, useTheme } from '@/theme';

import { AppText } from './AppText';
import { Icon } from './Icon';

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  /** When provided, shows a back chevron (secondary screens). */
  onBack?: () => void;
  right?: ReactNode;
}

export function ScreenHeader({ title, subtitle, onBack, right }: ScreenHeaderProps) {
  const t = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: space.screenX,
        paddingVertical: 10,
      }}
    >
      {onBack ? (
        <Pressable
          onPress={onBack}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Icon name="chevronLeft" color={t.ink} size={26} />
        </Pressable>
      ) : null}
      <View style={{ flex: 1 }}>
        <AppText variant="screenTitle" color={t.ink}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="secondary" color={t.sub}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {right}
    </View>
  );
}
