import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AppScreen from './Screen';
import SplashScreen from 'react-native-splash-screen';
import { ToastProvider } from 'react-native-toast-notifications';

const queryClient = new QueryClient();

export default function AppNavigation() {
  useEffect(() => {
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
