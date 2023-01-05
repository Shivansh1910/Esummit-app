import React, {useEffect} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {TransitionSpecs} from '@react-navigation/stack';
import {Otp, SignIn} from '../screens/AuthScreen';
import {HomePage} from '../screens/Home';
import {Maps} from '../screens/Map';
import {Profile} from '../screens/Profile';
import {More, Sponsors} from '../screens/Other';
import {Event} from '../screens/Event';
import {useProfileStore} from '../store/profile-store';
import {useUserDetailMutation} from '../hooks/mutation/user-action-mutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import { Navbar } from '../components/shared';

const Stack = createStackNavigator();

export default function AppScreen() {
  const navigation = useNavigation();

  const setProfile = useProfileStore(state => state.setProfile);

  const {mutateAsync: autoLogin} = useUserDetailMutation();

  const AutoLogin = async () => {
    const email = await AsyncStorage.getItem('email');
    if (email !== null) {
      console.log(email);
      autoLogin({email}).then(res => {
        console.log(res);
        setProfile({
          email: email,
          image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
          name: 'Guest User',
          pass: 'Not Purchased',
          isSignedIn: true,
        });
        navigation.navigate('Home' as never);
      });
    }
  };

  useEffect(() => {
    AutoLogin();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: ({current: {progress}}) => {
          return {
            cardStyle: {
              opacity: progress,
            },
          };
        },
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
        header: () => <Navbar navigation={navigation} />,
      }}>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomePage}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        name="Map"
        component={Maps}
      />
      <Stack.Screen
        name="More"
        component={More}
      />
      <Stack.Screen
        name="Event"
        component={Event}
      />
      <Stack.Screen
        name="Sponsors"
        component={Sponsors}
      />
    </Stack.Navigator>
  );
}
