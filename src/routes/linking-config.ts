import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../protocols';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          SignUp: {
            screens: {
              SignUpScreen: 'SignUp',
            },
          },
          SignIn: {
            screens: {
              SignInScreen: 'SignIn',
            },
          },
        },
      },
    },
  },
};

export default linking;
