import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '../../hooks/use-color-scheme';

export default function TabTwoScreen() {
  const { colorScheme } = useColorScheme();
  const currentColors = Colors[colorScheme as keyof typeof Colors];

  return (
    <SafeAreaProvider style = {{backgroundColor: currentColors.background}}>
      <SafeAreaView style = {{}} edges = {['top']}>
        <ScrollView style = {{}}>
          <TouchableOpacity
          onPress={() => {
            alert('Creating Group...')
          }}
          >
            <View style = {[styles.topButton, {backgroundColor: currentColors.tint}]}>
              <IconSymbol name="plus" size={20} color={currentColors.background} />
            </View>
          </TouchableOpacity>
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
