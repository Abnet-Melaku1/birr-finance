import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useTheme } from '@/theme';

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
    <View style={styles.header}>
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
      <View style={styles.titles}>
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

const styles = StyleSheet.create((theme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: theme.space.screenX,
    paddingVertical: 10,
  },
  titles: { flex: 1 },
}));
