import { useStorageState } from '@/hooks/useStorageState';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../../firebase.config';

const AuthContext = React.createContext<{
  user?: User | null;
  isLoading: boolean;
}>({
  user: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, user], setUser] = useStorageState('null');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) setUser(JSON.stringify(user));
      else setUser(null);
    });

    return () => unsubscribe();
  }, []);

  const parsed: User = JSON.parse(user || 'null');

  return (
    <AuthContext.Provider
      value={{
        user: parsed,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}