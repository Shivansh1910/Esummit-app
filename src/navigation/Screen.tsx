import React, { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { TransitionSpecs } from '@react-navigation/stack';
import { Otp, SignIn } from '../screens/AuthScreen';
import { HomePage } from '../screens/Home';
import { Maps } from '../screens/Map';
import { Profile } from '../screens/Profile';
import { More, Sponsors } from '../screens/Other';
import { Event } from '../screens/Event';
import { useNavigation } from '@react-navigation/native';
import { Navbar } from '../components/shared';
import { SplashPage } from '../screens/Splash';

const Stack = createStackNavigator();

export default function AppScreen() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: ({ current: { progress } }) => {
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
        name="Splash"
        component={SplashPage}
        options={{
          headerShown: false,
        }}
      />

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
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Map" component={Maps} />
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="Event" component={Event} />
      <Stack.Screen name="Sponsors" component={Sponsors} />
    </Stack.Navigator>
  );
}
