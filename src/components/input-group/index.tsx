import { Text, TextInput, TextInputProps, View } from 'react-native';

type InputGroupProps = TextInputProps & {
  error?: string | null;
  label?: string;
};

export const InputGroup: React.FC<InputGroupProps> = ({
  error,
  label,
  ...otherProps
}) => {
  return (
    <View className="space-y-1">
      {label && <Text className="text-sm text-gray-600">{label}</Text>}
      <TextInput
        {...otherProps}
        className="border border-gray-300 rounded-lg p-3"
      />
      {error && <Text className="text-sm text-red-600">{error}</Text>}
    </View>
  );
};
