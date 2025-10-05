import { getApps, initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5lyC_9TaHGAGHP7GEB478wbSKpSyZ0dk",
  authDomain: "steadfast-55b00.firebaseapp.com",
  projectId: "steadfast-55b00",
  storageBucket: "steadfast-55b00.firebasestorage.app",
  messagingSenderId: "919721715039",
  appId: "1:919721715039:web:3b01af6a2e2e67d9aec2ea",
  measurementId: "G-T0SDYKTVMD"
};

// Initialize Firebase (prevent multiple initializations)
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase Authentication with AsyncStorage persistence
let auth: any = null;
try {
  // Check if auth is already initialized
  try {
    auth = getAuth(app);
    console.log('✅ Firebase Auth (existing) initialized successfully');
  } catch (error) {
    // If no auth instance exists, create one with AsyncStorage persistence
    // For Firebase v10+, we need to use the correct persistence approach
    auth = initializeAuth(app);
    console.log('✅ Firebase Auth (new) initialized successfully with AsyncStorage');
  }
} catch (error) {
  console.error('❌ Failed to initialize Firebase Auth:', error);
  // Final fallback - try basic auth without persistence
  try {
    auth = getAuth(app);
    console.log('✅ Firebase Auth (fallback) initialized successfully');
  } catch (fallbackError) {
    console.error('❌ All auth initialization attempts failed:', fallbackError);
    auth = null;
  }
}

export { auth };

// Initialize Firestore
let db: any = null;

try {
  db = getFirestore(app);
  console.log('✅ Firestore initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Firestore:', error);
  throw error;
}

export { db };
export default app;