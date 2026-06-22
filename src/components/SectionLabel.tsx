import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useTheme } from '@/theme';

import { AppText } from './AppText';

export interface SectionLabelProps {
  title: string;
  action?: string;
  onActionPress?: () => void;
}

export function SectionLabel({ title, action, onActionPress }: SectionLabelProps) {
  const t = useTheme();
  return (
    <View style={styles.row}>
      <AppText variant="sectionLabel" color={t.ink}>
        {title}
      </AppText>
      {action ? (
        <Pressable onPress={onActionPress} accessibilityRole="link" hitSlop={8}>
          <AppText variant="caption" color={t.primary}>
            {action}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});
