import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { Dashboard } from '../views/dashboard';
import { SignIn } from '../views/signin';
import { SignUp } from '../views/signup';
import { VerifyAccount } from '../views/verify-account';

import { ClerkLoaded, useUser } from '@clerk/clerk-expo';
import { RootStackParamList } from '../protocols';
import LinkingConfiguration from './linking-config';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isSignedIn } = useUser();

  return (
    <ClerkLoaded>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ title: 'MyProfile' }}
          />
        ) : (
          <>
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ title: 'Sign Up' }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ title: 'Sign In' }}
            />
            <Stack.Screen
              name="VerifyAccount"
              component={VerifyAccount}
              options={{ title: 'Sign Up' }}
            />
          </>
        )}
      </Stack.Navigator>
    </ClerkLoaded>
  );
};
