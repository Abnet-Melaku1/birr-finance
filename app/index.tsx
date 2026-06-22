import { Text, View } from 'react-native';

/**
 * Placeholder home route. Replaced in Phase 3 by the tab group
 * (app/(tabs)/index.tsx → DashboardScreen).
 */
export default function Index() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: '700' }}>Birr — setup complete</Text>
    </View>
  );
}
