import { useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, InputGroup } from '../../components';
import { RootStackScreenProps } from '../../protocols';

export const VerifyAccount: React.FC<RootStackScreenProps<'VerifyAccount'>> = ({
  navigation,
}) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState('');

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });

      navigation.navigate('Dashboard');
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <View className="p-8 flex flex-col justify-center min-h-screen space-y-3">
      <View className="mb-3">
        <InputGroup
          label="Code"
          value={code}
          autoCapitalize="none"
          placeholder="Code..."
          onChangeText={code => setCode(code)}
        />
      </View>
      <Button onPress={onPressVerify}>Verify Email</Button>
    </View>
  );
};
