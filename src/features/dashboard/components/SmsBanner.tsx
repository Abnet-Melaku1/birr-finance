import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppText, Icon } from '@/components';
import { useTheme } from '@/theme';

export interface SmsBannerProps {
  count: number;
  onPress: () => void;
}

export function SmsBanner({ count, onPress }: SmsBannerProps) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.banner, pressed && styles.pressed]}
    >
      <View style={styles.iconTile}>
        <Icon name="scan" color={t.onPrimary} size={20} />
      </View>
      <View style={styles.body}>
        <AppText variant="cardTitle" color={t.ink}>
          {count} new transactions read
        </AppText>
        <AppText variant="secondary" color={t.sub}>
          Auto-filed from CBE, M-PESA &amp; telebirr SMS
        </AppText>
      </View>
      <Icon name="chevronRight" color={t.sub} size={20} />
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.primarySoft,
    borderRadius: theme.radii.card,
    padding: 14,
  },
  pressed: { opacity: 0.85 },
  iconTile: {
    width: 40,
    height: 40,
    borderRadius: theme.radii.tile,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1 },
}));
