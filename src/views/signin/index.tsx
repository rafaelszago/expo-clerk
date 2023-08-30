import { useSignIn } from '@clerk/clerk-expo';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, InputGroup } from '../../components';
import { RootStackScreenProps } from '../../protocols';

export const SignIn: React.FC<RootStackScreenProps<'SignIn'>> = ({
  navigation,
}) => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(err);
    }
  };

  const onSignUpPress = () => navigation.replace('SignUp');

  return (
    <KeyboardAvoidingView
      className="p-8 flex flex-col justify-center min-h-screen space-y-3"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View>
        <InputGroup
          label="E-mail"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={emailAddress => setEmailAddress(emailAddress)}
          className="border border-gray-300 rounded-lg p-3"
        />
      </View>

      <View className="mb-3">
        <InputGroup
          label="Password"
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
          className="border border-gray-300 rounded-lg p-3"
        />
      </View>

      <Button onPress={onSignInPress}>Sign in</Button>

      <View className="flex flex-row gap-1">
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={onSignUpPress}>
          <Text className="text-blue-500 font-medium">Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
