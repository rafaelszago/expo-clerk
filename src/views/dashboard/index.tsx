import { useAuth, useUser } from '@clerk/clerk-expo';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          signOut();
        }}
        className="w-full bg-indigo-600 p-3 rounded-lg">
        <Text className="text-white text-center">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Dashboard() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      className="p-8 flex flex-col justify-center min-h-screen space-y-3"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View>
        <SignOut />
      </View>
    </KeyboardAvoidingView>
  );
}
