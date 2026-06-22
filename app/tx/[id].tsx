import { useLocalSearchParams, useRouter } from 'expo-router';

import { AppText, Sheet } from '@/components';

export default function TxDetailModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  return (
    <Sheet title="Transaction" onClose={() => router.back()}>
      <AppText>Transaction {id}</AppText>
    </Sheet>
  );
}
