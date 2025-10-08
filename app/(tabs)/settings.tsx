import { router } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/theme';
import { auth } from '../../firebase.config';
import { useColorScheme } from '../../hooks/use-color-scheme';

export default function SettingScreen() {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const currentColors = Colors[colorScheme as keyof typeof Colors];

    const handleLogout = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Log Out',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await auth.signOut();
                            router.replace('/authentication/signIn');
                        } catch (error) {
                            console.error('Error signing out:', error);
                            Alert.alert('Error', 'Failed to log out. Please try again.');
                        }
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaProvider style={{ backgroundColor: currentColors.background }}>
            <SafeAreaView style={styles.container} edges={['top']}>
                <ScrollView style={styles.scrollView}>
                    <Text style={[styles.welcomeText, { color: currentColors.text }]}>Settings</Text>
                    <View style={styles.settingsView}>
                        <View style={styles.settingsComponent}>
                            <Text style={[styles.settingsText, { color: currentColors.text }]}>
                                {colorScheme === 'dark' ? 'Dark' : 'Light'} Theme
                            </Text>
                            <Switch 
                                value={colorScheme === 'dark'} 
                                onValueChange={toggleColorScheme} 
                                trackColor={{true: '#3b3e37' }} 
                                thumbColor={colorScheme === 'light' ? 'black' : 'white'} 
                                style={styles.switch}
                            />
                        </View>
                        <TouchableHighlight
                            onPress={handleLogout}
                            activeOpacity={0.6}
                            underlayColor={'transparent'}
                        >
                            <View style={[styles.logoutButton, { backgroundColor: currentColors.tint }]}>
                                <Text style={[styles.settingsText, { color: currentColors.background }]}>Log Out</Text>
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
  },
  logoutButton: {
    alignItems: 'center',
    margin: 15,
    padding: 15,
    borderRadius: 8,
    minWidth: 120,
  }
});