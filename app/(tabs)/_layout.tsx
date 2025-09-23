import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme  = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme === 'dark' ? 'dark' : 'light'].tint,
        // tabBarActiveTintColor: 'black',
        tabBarActiveTintColor: '#ae4d4e',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#c2b294',
          borderTopColor: '#c2b294',
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
