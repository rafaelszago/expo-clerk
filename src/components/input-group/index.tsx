import { Text, TextInput, TextInputProps, View } from 'react-native';

type InputGroupProps = TextInputProps & {
  label?: string;
};

export const InputGroup: React.FC<InputGroupProps> = ({
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
    </View>
  );
};
