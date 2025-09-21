import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
export default function SettingScreen() {
    // const { colorScheme, setColorScheme } = useColorScheme();
    // const toggleColorScheme = () => {
    //     setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
    // };
    // const isDarkMode = colorScheme === 'dark';
    // const textColor = isDarkMode ? 'white' : 'black';
    // const backgroundColor = isDarkMode ? 'black' : 'white';

    return (
        // <SafeAreaProvider style = {{backgroundColor: backgroundColor}}>
        <SafeAreaProvider style = {{backgroundColor: 'white'}}>
            <SafeAreaView style = {styles.container} edges = {['top']}>
                <ScrollView style = {styles.scrollView}>
                {/* <Text style = {[styles.welcomeText, { color: textColor }]}>Settings</Text> */}
                <Text style = {[styles.welcomeText, { color: 'grey' }]}>Settings</Text>
                <View style = {styles.settingsView}>
                    <View style = {styles.settingsComponent}>
                        {/* <Text style = {[styles.settingsText, { color: textColor }]}>{isDarkMode ? 'Dark' : 'Light'} Theme</Text> */}
                        <Text style = {[styles.settingsText, { color: 'grey' }]}>Dark Theme</Text>
                        {/* <Switch value={colorScheme === 'dark'} onValueChange={toggleColorScheme} trackColor={{false: '#000000', true: '#FFFFFF'}} ios_backgroundColor="#000000" thumbColor = {colorScheme === 'dark' ? 'black' : 'white'} style = {styles.switch}/> */}
                        <Switch value={true} onValueChange={() => {}} trackColor={{false: '#000000', true: '#FFFFFF'}} ios_backgroundColor="#000000" thumbColor = {'black'} style = {styles.switch}/>
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