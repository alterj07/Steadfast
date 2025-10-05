import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';
// Use Firestore (make sure rules are set to allow access)
import { createPrayer } from '../services/prayerService';
import { useSession } from './context/ctx';

interface PrayerFormProps {
  onPrayerCreated?: () => void;
  onCancel?: () => void;
}

export default function PrayerForm({ onPrayerCreated, onCancel }: PrayerFormProps) {
  const { colorScheme } = useColorScheme();
  const { user } = useSession();
  const currentColors = Colors[colorScheme as keyof typeof Colors];
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['General', 'Health', 'Family', 'Work', 'Relationships', 'Spiritual Growth', 'Gratitude'];

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Please fill in both title and content');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'You must be logged in to create a prayer');
      return;
    }

    setIsLoading(true);
    try {
      await createPrayer(user.uid, {
        title: title.trim(),
        content: content.trim(),
        category: category,
      });

      Alert.alert('Success', 'Your prayer has been added and will expire in 6 months');
      setTitle('');
      setContent('');
      setCategory('General');
      onPrayerCreated?.();
    } catch (error) {
      console.error('Error creating prayer:', error);
      Alert.alert('Error', 'Failed to create prayer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: currentColors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentColors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: currentColors.icon,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      color: currentColors.text,
      backgroundColor: currentColors.background,
      fontSize: 16,
    },
    textArea: {
      height: 120,
      textAlignVertical: 'top',
    },
    categoryContainer: {
      marginBottom: 16,
    },
    categoryLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: currentColors.text,
      marginBottom: 8,
    },
    categoryButtons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    categoryButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: currentColors.icon,
    },
    categoryButtonSelected: {
      backgroundColor: currentColors.tint,
      borderColor: currentColors.tint,
    },
    categoryButtonText: {
      color: currentColors.text,
      fontSize: 14,
    },
    categoryButtonTextSelected: {
      color: currentColors.background,
      fontWeight: '600',
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 20,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    submitButton: {
      backgroundColor: currentColors.tint,
    },
    cancelButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: currentColors.icon,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    submitButtonText: {
      color: currentColors.background,
    },
    cancelButtonText: {
      color: currentColors.text,
    },
    loadingText: {
      color: currentColors.text,
      textAlign: 'center',
      marginTop: 10,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create a Prayer</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Prayer title..."
        placeholderTextColor={currentColors.icon}
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />
      
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Share your prayer..."
        placeholderTextColor={currentColors.icon}
        value={content}
        onChangeText={setContent}
        multiline
        maxLength={1000}
      />
      
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryLabel}>Category</Text>
        <View style={styles.categoryButtons}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                category === cat && styles.categoryButtonSelected,
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  category === cat && styles.categoryButtonTextSelected,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
          disabled={isLoading}
        >
          <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={[styles.buttonText, styles.submitButtonText]}>
            {isLoading ? 'Creating...' : 'Create Prayer'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {isLoading && (
        <Text style={styles.loadingText}>Adding your prayer...</Text>
      )}
    </ScrollView>
  );
}
