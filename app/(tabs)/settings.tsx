import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function SettingScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style = {styles.container} edges = {['top']}>
        <ScrollView style = {styles.scrollView}>
          <Text style = {styles.welcomeText}>Settings</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink'
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  }
});
