import { useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, InputGroup } from '../../components';

export const SignUp: React.FC = () => {
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

  return (
    <View className="p-8 flex flex-col justify-center min-h-screen">
      <View className="space-y-3">
        <View>
          <InputGroup
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={email => setEmailAddress(email)}
          />
        </View>

        <View>
          <InputGroup
            label="Password"
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
          />
        </View>

        <Button onPress={onSignUpPress}>Sign up</Button>
      </View>
    </View>
  );
};
