import { useLocalSearchParams } from 'expo-router';

import { TxDetailSheet } from '@/features/transactions/components/TxDetailSheet';

export default function TxDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TxDetailSheet id={id} />;
}
