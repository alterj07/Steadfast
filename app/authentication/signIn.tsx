import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { auth } from '../../firebase.config';

export default function SignInScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const authentication = auth;

    const signIn = async () => {
      setLoading(true);
      try {
        const response = await signInWithEmailAndPassword(authentication, email, password);
        console.log("yay");
      } catch (error) {
        console.log("not working in signing in", error);
      } finally {
        setLoading(false);
      }
    }

    const signUp = async () => {
      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(authentication, email, password);
        console.log("yay");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    return (
      <SafeAreaProvider style = {{flex: 1, marginTop: 20}}>
        <ScrollView style = {{flex: 1, marginTop: 20}}>
          <View style = {styles.container}>
            <KeyboardAvoidingView>
              <Text>Sign In</Text>
              <TextInput
                placeholder="email@domain.com"
                value={email}
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
                style = {styles.input}
              />
              <TextInput
                placeholder="password123!"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                autoCapitalize="none"
                style = {styles.input}
              />
              {loading ? <ActivityIndicator size="large" color="#0000ff" />
              : (
                <>
                  <Button title = "Sign In" onPress = {signIn} />
                  <Button title = "Sign Up" onPress = {signUp} />
                </>
              )
              }
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </SafeAreaProvider>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
    // backgroundColor: 'red',
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
});