import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useTheme } from '@/theme';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';

export interface IconBtnProps {
  name: IconName;
  onPress?: () => void;
  /** Optional badge count (e.g. unread SMS). Hidden when 0/undefined. */
  badge?: number;
  accessibilityLabel: string;
  size?: number;
}

export function IconBtn({ name, onPress, badge, accessibilityLabel, size = 42 }: IconBtnProps) {
  const t = useTheme();
  const showBadge = typeof badge === 'number' && badge > 0;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={({ pressed }) => [styles.btn(size), pressed && styles.pressed]}
    >
      <Icon name={name} color={t.ink} size={size * 0.45} />
      {showBadge ? (
        <View style={styles.badge}>
          <AppText variant="micro" color={t.onPrimary}>
            {badge > 99 ? '99+' : badge}
          </AppText>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  btn: (size: number) => ({
    width: size,
    height: size,
    borderRadius: theme.radii.tile,
    backgroundColor: theme.surface,
    borderWidth: theme.mode === 'dark' ? 1 : 0,
    borderColor: theme.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  pressed: { opacity: 0.7 },
  badge: {
    position: 'absolute',
    top: -3,
    right: -3,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
