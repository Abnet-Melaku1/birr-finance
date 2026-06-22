import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Animated, Dimensions, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useTheme } from '@/theme';

import { AppText } from './AppText';
import { Icon } from './Icon';

const SCREEN_H = Dimensions.get('window').height;
const DURATION = 320;

export interface SheetProps {
  children: ReactNode;
  /** Called after the close animation finishes (e.g. router.back). */
  onClose: () => void;
  title?: string;
}

export function Sheet({ children, onClose, title }: SheetProps) {
  const t = useTheme();
  const [translateY] = useState(() => new Animated.Value(SCREEN_H));
  const [scrim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: DURATION, useNativeDriver: true }),
      Animated.timing(scrim, { toValue: 1, duration: DURATION, useNativeDriver: true }),
    ]).start();
  }, [translateY, scrim]);

  const close = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: SCREEN_H, duration: DURATION, useNativeDriver: true }),
      Animated.timing(scrim, { toValue: 0, duration: DURATION, useNativeDriver: true }),
    ]).start(({ finished }) => {
      if (finished) onClose();
    });
  }, [translateY, scrim, onClose]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.scrim, { opacity: scrim }]}>
        <Pressable style={styles.fill} onPress={close} accessibilityLabel="Dismiss" />
      </Animated.View>

      <Animated.View style={[styles.panel, { transform: [{ translateY }] }]}>
        <View style={styles.handle} />
        {title ? (
          <View style={styles.titleRow}>
            <AppText variant="screenTitle" color={t.ink}>
              {title}
            </AppText>
            <Pressable onPress={close} hitSlop={10} accessibilityLabel="Close">
              <Icon name="close" color={t.sub} size={22} />
            </Pressable>
          </View>
        ) : null}
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: { flex: 1, justifyContent: 'flex-end' },
  fill: { flex: 1 },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.scrim,
  },
  panel: {
    backgroundColor: theme.surface,
    borderTopLeftRadius: theme.radii.sheet,
    borderTopRightRadius: theme.radii.sheet,
    paddingHorizontal: theme.space.screenX,
    paddingBottom: rt.insets.bottom + theme.space.card,
    maxHeight: '92%',
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.faint,
    marginTop: 10,
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
}));
