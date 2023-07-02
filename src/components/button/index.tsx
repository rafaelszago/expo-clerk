import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  children: React.ReactNode;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export const Button: React.FC<ButtonProps> = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full bg-indigo-600 p-3 rounded-lg">
      <Text className="text-white text-center">{children}</Text>
    </TouchableOpacity>
  );
};
