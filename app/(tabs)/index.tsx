import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/theme';
import { auth } from '../../firebase.config';
import { useColorScheme } from '../../hooks/use-color-scheme';

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const currentColors = Colors[colorScheme as keyof typeof Colors];

  return (
    <SafeAreaProvider style = {{backgroundColor: currentColors.background, flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
      <SafeAreaView style = {styles.container} edges = {['top']}>
        <ScrollView style = {styles.scrollView}>
        <Text style = {[styles.welcomeText, { color: currentColors.text }]}>Welcome {auth.currentUser?.displayName}!</Text>
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
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  }
});
