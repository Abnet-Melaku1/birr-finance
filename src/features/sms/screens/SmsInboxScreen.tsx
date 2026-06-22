import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppText, CategoryPicker, PhoneShell, ScreenHeader, Sheet } from '@/components';
import { useFileSms, useSetSmsCategory, useSmsInbox } from '@/store';
import { space, useTheme } from '@/theme';

import { PrivacyBanner } from '../components/PrivacyBanner';
import { SmsCard } from '../components/SmsCard';

export function SmsInboxScreen() {
  const t = useTheme();
  const router = useRouter();
  const inbox = useSmsInbox();
  const fileSms = useFileSms();
  const setSmsCategory = useSetSmsCategory();
  const [editingId, setEditingId] = useState<string | null>(null);

  const editing = editingId ? inbox.find((s) => s.id === editingId) : undefined;

  return (
    <PhoneShell>
      <ScreenHeader
        title="SMS Inbox"
        subtitle="Auto-parsed from your banks"
        onBack={() => router.back()}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PrivacyBanner />
        <AppText variant="sectionLabel" color={t.ink}>
          Recently captured
        </AppText>
        {inbox.map((item) => (
          <SmsCard
            key={item.id}
            item={item}
            onConfirm={() => fileSms(item.id)}
            onChange={() => setEditingId(item.id)}
          />
        ))}
      </ScrollView>

      {editing ? (
        <View style={styles.overlay}>
          <Sheet title="Change category" onClose={() => setEditingId(null)}>
            <CategoryPicker
              value={editing.cat}
              onSelect={(cat) => {
                setSmsCategory(editing.id, cat);
                setEditingId(null);
              }}
            />
          </Sheet>
        </View>
      ) : null}
    </PhoneShell>
  );
}

const styles = StyleSheet.create(() => ({
  content: {
    paddingHorizontal: space.screenX,
    paddingBottom: space.scrollBottom,
    gap: 12,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));
