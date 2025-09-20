import { useColorScheme } from '@/hooks/use-color-scheme';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
export default function SettingScreen() {
    const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();
  
    // Convert string to boolean for Switch component
    const isDarkMode = colorScheme === 'dark';

    return (
        <SafeAreaProvider style = {{backgroundColor: 'pink'}}>
            <SafeAreaView style = {styles.container} edges = {['top']}>
                <ScrollView style = {styles.scrollView}>
                <Text style = {styles.welcomeText}>Settings</Text>
                <View style = {styles.settingsView}>
                    <View style = {styles.settingsComponent}>
                        <Text style = {styles.settingsText}>Dark</Text>
                        <Switch value={isDarkMode} onValueChange={toggleColorScheme} trackColor={{false: '#000000', true: '#FFFFFF'}} ios_backgroundColor="#000000" thumbColor = {colorScheme === 'dark' ? 'black' : 'white'} style = {styles.switch}/>
                    </View>
                </View>
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
  },
  settingsView: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20
  },
  switch: {
    alignSelf: 'center',
  },
  settingsComponent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsText: {
    fontWeight: 'bold',
    padding: 5
  }
});
