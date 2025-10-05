import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import * as Haptics from 'expo-haptics';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '../../hooks/use-color-scheme';

export default function TabTwoScreen() {
  const { colorScheme } = useColorScheme();
  const currentColors = Colors[colorScheme as keyof typeof Colors];

  return (
    <SafeAreaProvider style = {{backgroundColor: currentColors.background, flex: 1}}>
      <SafeAreaView style = {{flex: 1}} edges = {['top']}>
        <ScrollView style = {{flex: 1}}>
          {/* make this touchableopacity only show up when the user has at least one group joined */}
          <TouchableOpacity
          onPress={() => {
            alert('Creating Group...'),
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }}
          >
            <View style = {[styles.topButton, {backgroundColor: currentColors.tint}]}>
              <IconSymbol name="plus" size={20} color={currentColors.background} />
            </View>
          </TouchableOpacity>
          <View style = {{alignItems: 'center', justifyContent: 'center', marginTop: '50%'}}>
            <Text style={{ color: currentColors.text }}>No Groups Joined?</Text>
            <TouchableOpacity onPress={() => {
              alert('Joining Group...'),
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            }}
            style = {{backgroundColor: currentColors.tint, padding: 10, borderRadius: 10}}
            >
              <Text style={{ color: currentColors.text }}>Join Here!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  topButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginRight: 15,
    marginLeft: 'auto',
    width: '20%',
  }
});
