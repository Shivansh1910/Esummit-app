import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import AppScreen from './Screen';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';
import {ToastProvider} from 'react-native-toast-notifications';

const queryClient = new QueryClient();

export default function AppNavigation() {
  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  useEffect(() => {
    createChannel();
    SplashScreen.hide();
  }, []);

  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider
          placement={'top'}
          duration={2000}
          textStyle={{
            fontFamily: 'Montserrat-Bold',
            fontSize: 12,
            color: '#fff',
          }}
          animationType={'slide-in'}
          successColor={'#00812F'}
          dangerColor={'#D10000'}>
          <NavigationContainer>
            <SafeAreaProvider>
              <StatusBar barStyle={'light-content'} backgroundColor="#141415" />
              <AppScreen />
            </SafeAreaProvider>
          </NavigationContainer>
        </ToastProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}
