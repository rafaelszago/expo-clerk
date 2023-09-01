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
import { ClerkError, RootStackScreenProps } from '../../protocols';

export const SignUp: React.FC<RootStackScreenProps<'SignUp'>> = ({
  navigation,
}) => {
  const { isLoaded, signUp } = useSignUp();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      navigation.navigate('VerifyAccount');
    } catch (err) {
      const clerkError = err as ClerkError;
      setErrors(clerkError.errors.map(error => error.message));
    }
  };

  const onSignInPress = () => navigation.replace('SignIn');

  return (
    <KeyboardAvoidingView
      className="p-8 flex flex-col justify-center min-h-screen space-y-3"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View>
        <InputGroup
          label="First Name"
          autoCapitalize="words"
          value={firstName}
          placeholder="John"
          onChangeText={firstName => setFirstName(firstName)}
        />
      </View>
      <View>
        <InputGroup
          label="Last Name"
          autoCapitalize="words"
          value={lastName}
          placeholder="Doe"
          onChangeText={lastName => setLastName(lastName)}
        />
      </View>
      <View>
        <InputGroup
          label="E-mail"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="you@mail.com"
          onChangeText={emailAddress => setEmailAddress(emailAddress)}
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
      {errors.length > 0 &&
        errors.map((error, index) => (
          <Text key={index} className="text-sm text-red-500">
            {error}
          </Text>
        ))}
      <View className="flex flex-row gap-1">
        <Text>Have an account?</Text>
        <TouchableOpacity onPress={onSignInPress}>
          <Text className="text-blue-500 font-medium">Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
