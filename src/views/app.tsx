import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { CLERK_PUBLISHABLE_KEY } from '@env';
import { SafeAreaView } from 'react-native';
import { tokenCache } from '../helpers';
import Dashboard from './dashboard';
import { SignIn } from './signin';

export default function App() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY ?? ''}>
      <SafeAreaView>
        <SignedIn>
          <Dashboard />
        </SignedIn>
        <SignedOut>
          <SignIn />
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}
