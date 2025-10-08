import { Redirect } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase.config';

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return null; // or a loading component
  }

  if (user) {
    // User is authenticated, redirect to main app
    return <Redirect href="/(tabs)" />;
  }

  // User is not authenticated, redirect to sign in
  return <Redirect href="/authentication/signIn" />;
}
