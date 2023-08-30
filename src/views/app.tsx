import { ClerkProvider } from '@clerk/clerk-expo';
import { CLERK_PUBLISHABLE_KEY } from '@env';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { tokenCache } from '../helpers';
import Navigation from '../routes';

export default function App() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY ?? ''}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
