import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBclloYDVdXJTi-P-LcyuE7Os7RZPHB9Jw",
  authDomain: "stead-31544.firebaseapp.com",
  projectId: "stead-31544",
  storageBucket: "stead-31544.firebasestorage.app",
  messagingSenderId: "797952027737",
  appId: "1:797952027737:web:b0e58e4961f17a9b069548",
  measurementId: "G-JQ3WZBML7W"
};

// Initialize Firebase only if it hasn't been initialized already
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
// export const db = getFirestore(app);