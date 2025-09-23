import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SessionProvider } from '../components/context/ctx';


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  // const { colorScheme } = useColorScheme();

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <SafeAreaProvider style = {{backgroundColor: '#c2b294'}}>
      <SessionProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="authentication/signIn" options={{headerShown: true}} />
            <Stack.Screen name="(tabs)" />
          </Stack>
          {/* <StatusBar style="auto" /> */}
        </ThemeProvider>
      </SessionProvider>
    </SafeAreaProvider>
  );
}
