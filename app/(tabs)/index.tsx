import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  // const { colorScheme } = useColorScheme();
  // const [theme, setTheme] = useState(colorScheme === 'dark' ? 'dark' : 'light');
  // const isDarkMode = theme === 'dark';
  // const textColor = isDarkMode ? 'white' : 'black';
  // const backgroundColor = isDarkMode ? 'black' : 'white';

  // const toggleColorScheme = () => {
  //   setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  // };
  return (
    // <SafeAreaProvider style = {{backgroundColor: backgroundColor}}>
    <SafeAreaProvider style = {{backgroundColor: '#c2b294'}}>
      <SafeAreaView style = {styles.container} edges = {['top']}>
        <ScrollView style = {styles.scrollView}>
          {/* <Text style = {[styles.welcomeText, { color: textColor }]}>Welcome Jayden Chun!</Text> */}
          <Text style = {[styles.welcomeText, { color: '#3b3e37' }]}>Welcome Jayden Chun!</Text>
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
