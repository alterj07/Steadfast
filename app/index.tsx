import { Redirect } from 'expo-router';
import { useSession } from '../components/context/ctx';

export default function Index() {
  const { user, isLoading } = useSession();

  if (isLoading) {
    // You could show a loading screen here
    return null;
  }

  if (user) {
    // User is authenticated, redirect to main app
    return <Redirect href="/(tabs)" />;
  }

  // User is not authenticated, redirect to sign in
  return <Redirect href="/authentication/signIn" />;
}
