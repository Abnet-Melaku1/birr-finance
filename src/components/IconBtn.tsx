import { Pressable, View } from 'react-native';

import { radii, useTheme } from '@/theme';

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
      style={({ pressed }) => ({
        width: size,
        height: size,
        borderRadius: radii.tile,
        backgroundColor: t.surface,
        borderWidth: t.mode === 'dark' ? 1 : 0,
        borderColor: t.hairline,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Icon name={name} color={t.ink} size={size * 0.45} />
      {showBadge ? (
        <View
          style={{
            position: 'absolute',
            top: -3,
            right: -3,
            minWidth: 18,
            height: 18,
            paddingHorizontal: 5,
            borderRadius: radii.pill,
            backgroundColor: t.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AppText variant="micro" color={t.onPrimary}>
            {badge > 99 ? '99+' : badge}
          </AppText>
        </View>
      ) : null}
    </Pressable>
  );
}
