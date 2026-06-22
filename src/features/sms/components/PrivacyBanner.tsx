import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppText, Icon } from '@/components';
import { tint } from '@/lib/money';
import { useTheme } from '@/theme';

export function PrivacyBanner() {
  const t = useTheme();
  return (
    <View style={styles.banner}>
      <View style={styles.iconTile}>
        <Icon name="shield" color={t.income} size={20} />
      </View>
      <View style={styles.body}>
        <AppText variant="cardTitle" color={t.ink}>
          Read on-device only
        </AppText>
        <AppText variant="secondary" color={t.sub}>
          We detect transaction texts and file them by category. Your messages never leave the
          phone.
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  banner: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    backgroundColor: theme.incomeSoft,
    borderRadius: theme.radii.card,
    padding: 14,
  },
  iconTile: {
    width: 40,
    height: 40,
    borderRadius: theme.radii.tile,
    backgroundColor: tint(theme.income, theme.surface, theme.mode === 'dark' ? 28 : 18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1 },
}));
