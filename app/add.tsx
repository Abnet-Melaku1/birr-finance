import { useRouter } from 'expo-router';

import { AppText, Sheet } from '@/components';

export default function AddModal() {
  const router = useRouter();
  return (
    <Sheet title="Add transaction" onClose={() => router.back()}>
      <AppText>Add form</AppText>
    </Sheet>
  );
}
