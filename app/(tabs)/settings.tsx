import { getAuth } from 'firebase/auth';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import firebase from '../../firebase.config';
export default function SettingScreen() {
    const auth = getAuth(firebase);
    return (
        // <SafeAreaProvider style = {{backgroundColor: backgroundColor}}>
        <SafeAreaProvider style = {{backgroundColor: '#c2b294'}}>
            <SafeAreaView style = {styles.container} edges = {['top']}>
                <ScrollView style = {styles.scrollView}>
                {/* <Text style = {[styles.welcomeText, { color: textColor }]}>Settings</Text> */}
                  <Text style = {[styles.welcomeText, { color: '#3b3e37' }]}>Settings</Text>
                  <View style = {styles.settingsView}>
                      <View style = {styles.settingsComponent}>
                          {/* <Text style = {[styles.settingsText, { color: textColor }]}>{isDarkMode ? 'Dark' : 'Light'} Theme</Text> */}
                          <Text style = {[styles.settingsText, { color: '#3b3e37' }]}>Dark Theme</Text>
                          {/* <Switch value={colorScheme === 'dark'} onValueChange={toggleColorScheme} trackColor={{false: '#000000', true: '#FFFFFF'}} ios_backgroundColor="#000000" thumbColor = {colorScheme === 'dark' ? 'black' : 'white'} style = {styles.switch}/> */}
                          <Switch value={true} onValueChange={() => {}} trackColor={{false: '#000000', true: '#FFFFFF'}} ios_backgroundColor="#000000" thumbColor = {'black'} style = {styles.switch}/>
                      </View>
                      <TouchableHighlight
                        onPress = {() => {
                          console.log('Log Out');
                          auth.signOut();
                        }}
                        // onPress = {() => {alert('Log Out'), firebase.auth().signOut()}}
                        activeOpacity = {0.6}
                        underlayColor={'transparent'}
                      >
                        <View style = {{alignItems: 'center', margin: 15, padding: 5, backgroundColor: 'red', borderRadius: 5}}>
                          <Text style = {[styles.settingsText, { color: 'white' }]}>Log Out</Text>
                        </View>
                      </TouchableHighlight>
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