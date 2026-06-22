import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { CATEGORY_LIST, type CategoryKey } from '@/lib/data';
import { tint } from '@/lib/money';
import { useTheme } from '@/theme';

import { AppText } from './AppText';
import { CatIcon } from './CatIcon';

export interface CategoryPickerProps {
  value?: CategoryKey;
  onSelect: (cat: CategoryKey) => void;
}

export function CategoryPicker({ value, onSelect }: CategoryPickerProps) {
  const t = useTheme();
  return (
    <View style={styles.grid}>
      {CATEGORY_LIST.map((c) => {
        const active = c.key === value;
        return (
          <Pressable
            key={c.key}
            onPress={() => onSelect(c.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={[
              styles.chip,
              active
                ? {
                    borderColor: c.color,
                    backgroundColor: tint(c.color, t.surface, t.mode === 'dark' ? 24 : 12),
                  }
                : { borderColor: t.hairline },
            ]}
          >
            <CatIcon name={c.icon} color={c.color} size={26} />
            <AppText variant="caption" color={t.ink} numberOfLines={1}>
              {c.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: theme.radii.pill,
    borderWidth: 1.5,
  },
}));
