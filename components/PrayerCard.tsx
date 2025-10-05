import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';
import { Prayer } from '../types/prayer';

interface PrayerCardProps {
  prayer: Prayer;
  onMarkAnswered?: (prayerId: string) => void;
  onDelete?: (prayerId: string) => void;
}

export default function PrayerCard({ prayer, onMarkAnswered, onDelete }: PrayerCardProps) {
  const { colorScheme } = useColorScheme();
  const currentColors = Colors[colorScheme as keyof typeof Colors];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysUntilExpiry = (expiresAt: Date) => {
    const now = new Date();
    const diffTime = expiresAt.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilExpiry = getDaysUntilExpiry(prayer.expiresAt);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: currentColors.background,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: currentColors.shadow1,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: currentColors.icon + '20',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: currentColors.text,
      flex: 1,
      marginRight: 8,
    },
    category: {
      fontSize: 12,
      color: currentColors.tint,
      backgroundColor: currentColors.tint + '20',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      fontWeight: '600',
    },
    content: {
      fontSize: 16,
      color: currentColors.text,
      lineHeight: 22,
      marginBottom: 12,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    date: {
      fontSize: 12,
      color: currentColors.icon,
    },
    expiry: {
      fontSize: 12,
      color: daysUntilExpiry < 30 ? '#FF6B6B' : currentColors.icon,
      marginLeft: 8,
      fontWeight: '600',
    },
    actions: {
      flexDirection: 'row',
      gap: 8,
    },
    actionButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: currentColors.icon,
    },
    actionButtonAnswered: {
      backgroundColor: currentColors.tint,
      borderColor: currentColors.tint,
    },
    actionButtonText: {
      fontSize: 12,
      color: currentColors.text,
      fontWeight: '600',
    },
    actionButtonTextAnswered: {
      color: currentColors.background,
    },
    answeredBadge: {
      backgroundColor: '#4CAF50',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginBottom: 8,
    },
    answeredText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.card}>
      {prayer.isAnswered && (
        <View style={styles.answeredBadge}>
          <Text style={styles.answeredText}>✓ Answered</Text>
        </View>
      )}
      
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          {prayer.title}
        </Text>
        <Text style={styles.category}>{prayer.category}</Text>
      </View>
      
      <Text style={styles.content} numberOfLines={4}>
        {prayer.content}
      </Text>
      
      <View style={styles.footer}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {formatDate(prayer.createdAt)}
          </Text>
          <Text style={styles.expiry}>
            {daysUntilExpiry > 0 
              ? `${daysUntilExpiry} days left`
              : 'Expired'
            }
          </Text>
        </View>
        
        <View style={styles.actions}>
          {!prayer.isAnswered && onMarkAnswered && (
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonAnswered]}
              onPress={() => onMarkAnswered(prayer.id)}
            >
              <Text style={[styles.actionButtonText, styles.actionButtonTextAnswered]}>
                Mark Answered
              </Text>
            </TouchableOpacity>
          )}
          
          {onDelete && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onDelete(prayer.id)}
            >
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
