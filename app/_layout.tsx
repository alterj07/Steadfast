import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from '../constants/theme';
import { ColorSchemeProvider, useColorScheme } from '../hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutContent() {
  const { colorScheme } = useColorScheme();
  const currentColors = Colors[colorScheme as keyof typeof Colors];

  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: currentColors.background }}>
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="authentication/signIn" />
            <Stack.Screen name="(tabs)" />
          </Stack>
          {/* <StatusBar style="auto" /> */}
        </ThemeProvider>
      </SafeAreaProvider>
    </>
  );
}

export default function RootLayout() {
  return (
    <ColorSchemeProvider>
      <RootLayoutContent />
    </ColorSchemeProvider>
  );
}
