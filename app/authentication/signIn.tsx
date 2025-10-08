import { Redirect } from 'expo-router';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { auth } from '../../firebase.config';

export default function SignInScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const authentication = auth;

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    // If user is authenticated, redirect to main app
    if (user) {
        return <Redirect href="/(tabs)" />;
    }

    const signIn = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await signInWithEmailAndPassword(authentication, email, password);
        console.log("Sign in successful");
        // The user will be automatically redirected by the auth state listener in index.tsx
      } catch (error: any) {
        console.log("Sign in error:", error);
        setError(error.message || "Sign in failed");
      } finally {
        setLoading(false);
      }
    }

    const signUp = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await createUserWithEmailAndPassword(authentication, email, password);
        console.log("Sign up successful");
        // The user will be automatically redirected by the auth state listener in index.tsx
      } catch (error: any) {
        console.log("Sign up error:", error);
        setError(error.message || "Sign up failed");
      } finally {
        setLoading(false);
      }
    }

    return (
      <SafeAreaProvider style = {{flex: 1, marginTop: 20}}>
        <ScrollView style = {{flex: 1, marginTop: 20}}>
          <View style = {styles.container}>
            <KeyboardAvoidingView>
              <Text style={styles.title}>Sign In</Text>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 250,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});