import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Placeholder entry. Replace with the navigation root once the theme system
// and screens exist (see CLAUDE.md §9 build order + SETUP first prompts).
export default function App() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Birr</Text>
      <Text style={styles.sub}>Start with the theme system — see CLAUDE.md §9.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FBFAF7' },
  title: { fontSize: 38, fontWeight: '800', color: '#1C1A18' },
  sub: { marginTop: 8, fontSize: 13, color: '#857D74' },
});
