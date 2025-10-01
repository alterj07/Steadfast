import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

export default function TabLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const currentColors = Colors[colorScheme as keyof typeof Colors];

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme === 'dark' ? 'dark' : 'light'].tint,
        // tabBarActiveTintColor: 'black',
        tabBarActiveTintColor: currentColors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: currentColors.background,
          borderTopColor: currentColors.background,
          height: 70,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <IconSymbol size={40} name="house" color={color} style = {{marginTop: 20}} />,
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <IconSymbol size={40} name="rectangle.3.group.bubble" color={color} style = {{marginTop: 20}} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <IconSymbol size={40} name="gear" color={color} style = {{marginTop: 20}} />,
        }}
      />
    </Tabs>
  );
}
