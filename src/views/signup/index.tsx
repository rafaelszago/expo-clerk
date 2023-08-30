import { useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, InputGroup } from '../../components';
import { RootStackScreenProps } from '../../protocols';

export const SignUp: React.FC<RootStackScreenProps<'SignUp'>> = ({
  navigation,
}) => {
  const { isLoaded, signUp } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
    } catch (err) {
      console.log(err);
    }
  };

  const onSignInPress = () => navigation.replace('SignIn');

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
          onChangeText={email => setEmailAddress(email)}
        />
      </View>

      <View className="mb-3">
        <InputGroup
          label="Password"
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>

      <Button onPress={onSignUpPress}>Sign up</Button>

      <View className="flex flex-row gap-1">
        <Text>Have an account?</Text>
        <TouchableOpacity onPress={onSignInPress}>
          <Text className="text-blue-500 font-medium">Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
