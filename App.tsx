/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import PushNotification, { Importance } from 'react-native-push-notification';
import AppNavigation from './src/navigation/App';

const App = () => {
  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel',
        channelName: 'notification channel',
        channelDescription: 'A channel to categorise your notifications',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`),
    );
  };

  useEffect(() => {
    createChannel();
    PushNotification.requestPermissions();
    PushNotification.getChannels(function (channel_ids) {
      console.log(channel_ids);
    });
  }, []);

  return <AppNavigation />;
};

export default App;
