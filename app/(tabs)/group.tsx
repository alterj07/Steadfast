import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  return (
    <SafeAreaProvider style = {{backgroundColor: '#c2b294'}}>
          <SafeAreaView style = {{}} edges = {['top']}>
            <ScrollView style = {{}}>
              {/* <Text style = {[styles.welcomeText, { color: textColor }]}>Welcome Jayden Chun!</Text> */}
              <Text style = {[{ color: '#3b3e37' }]}>Text</Text>
            </ScrollView>
          </SafeAreaView>
        </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
