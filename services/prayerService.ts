import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { CreatePrayerData, Prayer, PrayerFilters } from '../types/prayer';

const PRAYERS_COLLECTION = 'prayers';

// Test function to verify Firestore is working
export const testFirestoreConnection = async (): Promise<boolean> => {
  try {
    console.log('🔍 Testing Firestore connection...');
    console.log('Database instance:', db);
    console.log('Database type:', typeof db);
    console.log('Database constructor:', db?.constructor?.name);
    
    // Wait a bit for async initialization if db is null
    if (!db) {
      console.log('⏳ Database not ready yet, waiting for initialization...');
      // Wait up to 5 seconds for Firestore to initialize
      for (let i = 0; i < 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (db) {
          console.log('✅ Database initialized after waiting');
          break;
        }
      }
    }
    
    if (!db) {
      console.error('❌ Database not initialized after waiting - Firestore may not be enabled');
      console.error('🔧 SOLUTION: Please enable Firestore in your Firebase Console:');
      console.error('1. Go to https://console.firebase.google.com');
      console.error('2. Select your project: steadfast-55b00');
      console.error('3. Click "Firestore Database" in the left sidebar');
      console.error('4. Click "Get started" if you see it');
      console.error('5. Choose "Start in test mode" for development');
      console.error('6. Select a location (e.g., nam5)');
      return false;
    }
    
    // Check if db has the expected Firestore methods
    if (typeof db.collection !== 'function' && typeof db.doc !== 'function') {
      console.error('❌ Database does not have expected Firestore methods');
      console.log('Available methods:', Object.getOwnPropertyNames(db));
      return false;
    }
    
    // Try to create a simple collection reference
    const testCollection = collection(db, 'test');
    console.log('✅ Test collection reference created:', testCollection);
    console.log('Collection type:', typeof testCollection);
    console.log('Collection constructor:', testCollection?.constructor?.name);
    
    return true;
  } catch (error) {
    console.error('❌ Firestore connection test failed:', error);
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error?.constructor?.name);
    
    if (error.message && error.message.includes('Service firestore is not available')) {
      console.error('🔧 SOLUTION: Firestore service is not available in your Firebase project');
      console.error('This usually means Firestore is not enabled. Please:');
      console.error('1. Go to Firebase Console');
      console.error('2. Select your project: steadfast-55b00');
      console.error('3. Enable Firestore Database');
    }
    
    return false;
  }
};

// Helper function to add 6 months to current date
const addSixMonths = (date: Date): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 6);
  return result;
};

// Create a new prayer
export const createPrayer = async (userId: string, prayerData: CreatePrayerData): Promise<string> => {
  try {
    const now = new Date();
    const prayer: Omit<Prayer, 'id'> = {
      userId,
      title: prayerData.title,
      content: prayerData.content,
      createdAt: now,
      expiresAt: addSixMonths(now),
      isAnswered: false,
      category: prayerData.category || 'General',
      tags: prayerData.tags || []
    };

    const docRef = await addDoc(collection(db, PRAYERS_COLLECTION), {
      ...prayer,
      createdAt: Timestamp.fromDate(prayer.createdAt),
      expiresAt: Timestamp.fromDate(prayer.expiresAt)
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating prayer:', error);
    throw new Error('Failed to create prayer');
  }
};

// Get recent prayers for a user
export const getRecentPrayers = async (userId: string, limitCount: number = 10): Promise<Prayer[]> => {
  try {
    // Check if db is properly initialized
    if (!db) {
      console.error('Firestore database not initialized');
      throw new Error('Firestore database not initialized. Please check your Firebase configuration.');
    }

    console.log('Fetching prayers for user:', userId);
    console.log('Database instance:', db);
    console.log('Collection name:', PRAYERS_COLLECTION);
    
    // Create collection reference with additional error handling
    let prayersCollection;
    try {
      prayersCollection = collection(db, PRAYERS_COLLECTION);
      console.log('Collection reference created:', prayersCollection);
    } catch (collectionError) {
      console.error('Failed to create collection reference:', collectionError);
      throw new Error('Failed to create collection reference. Check Firestore configuration.');
    }
    
    const q = query(
      prayersCollection,
      where('userId', '==', userId),
      where('expiresAt', '>', Timestamp.now()),
      orderBy('expiresAt'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const prayers: Prayer[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      prayers.push({
        id: doc.id,
        userId: data.userId,
        title: data.title,
        content: data.content,
        createdAt: data.createdAt.toDate(),
        expiresAt: data.expiresAt.toDate(),
        isAnswered: data.isAnswered,
        category: data.category,
        tags: data.tags || []
      });
    });

    console.log('Successfully fetched prayers:', prayers.length);
    return prayers;
  } catch (error) {
    console.error('Error fetching prayers:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any)?.code || 'unknown',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    throw new Error('Failed to fetch prayers');
  }
};

// Get prayers with filters
export const getPrayers = async (userId: string, filters: PrayerFilters = {}): Promise<Prayer[]> => {
  try {
    let q = query(
      collection(db, PRAYERS_COLLECTION),
      where('userId', '==', userId),
      where('expiresAt', '>', Timestamp.now())
    );

    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }

    if (filters.isAnswered !== undefined) {
      q = query(q, where('isAnswered', '==', filters.isAnswered));
    }

    q = query(q, orderBy('createdAt', 'desc'));

    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }

    const querySnapshot = await getDocs(q);
    const prayers: Prayer[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      prayers.push({
        id: doc.id,
        userId: data.userId,
        title: data.title,
        content: data.content,
        createdAt: data.createdAt.toDate(),
        expiresAt: data.expiresAt.toDate(),
        isAnswered: data.isAnswered,
        category: data.category,
        tags: data.tags || []
      });
    });

    return prayers;
  } catch (error) {
    console.error('Error fetching prayers:', error);
    throw new Error('Failed to fetch prayers');
  }
};

// Mark prayer as answered
export const markPrayerAsAnswered = async (prayerId: string): Promise<void> => {
  try {
    const prayerRef = doc(db, PRAYERS_COLLECTION, prayerId);
    await updateDoc(prayerRef, {
      isAnswered: true
    });
  } catch (error) {
    console.error('Error updating prayer:', error);
    throw new Error('Failed to update prayer');
  }
};

// Delete a prayer
export const deletePrayer = async (prayerId: string): Promise<void> => {
  try {
    const prayerRef = doc(db, PRAYERS_COLLECTION, prayerId);
    await deleteDoc(prayerRef);
  } catch (error) {
    console.error('Error deleting prayer:', error);
    throw new Error('Failed to delete prayer');
  }
};

// Clean up expired prayers (this can be called periodically)
export const cleanupExpiredPrayers = async (): Promise<void> => {
  try {
    const q = query(
      collection(db, PRAYERS_COLLECTION),
      where('expiresAt', '<=', Timestamp.now())
    );

    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    
    await Promise.all(deletePromises);
    console.log(`Cleaned up ${querySnapshot.docs.length} expired prayers`);
  } catch (error) {
    console.error('Error cleaning up expired prayers:', error);
  }
};
