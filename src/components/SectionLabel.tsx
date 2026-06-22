import { Pressable, View } from 'react-native';

import { useTheme } from '@/theme';

import { AppText } from './AppText';

export interface SectionLabelProps {
  title: string;
  /** Optional right-aligned action link (e.g. "See all"). */
  action?: string;
  onActionPress?: () => void;
}

export function SectionLabel({ title, action, onActionPress }: SectionLabelProps) {
  const t = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}
    >
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
