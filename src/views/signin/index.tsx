import { useSignIn } from '@clerk/clerk-expo';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, InputGroup } from '../../components';

export const SignIn: React.FC = () => {
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
    </KeyboardAvoidingView>
  );
};
