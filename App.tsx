/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import AppNavigation from './src/navigation/App';

const App = () => {

  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // (required)
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
  }, []);

  // const handleNotification = () => {
  //   PushNotification.localNotification({
  //     channelId: 'channel-id',
  //     title: 'My Notification Title', // (optional)
  //     message: 'My Notification Message', // (required)
  //   });
  // };

  const handleScheduleNotification = async () => {
    PushNotification.localNotificationSchedule({
      channelId: 'fcm_fallback_notification_channel',
      title: 'My Notification',
      message: 'My Notification Message',
      date: new Date(Date.now() + 10 * 1000),
      allowWhileIdle: true
    });

    console.log('Notification scheduled');
  };

  return <AppNavigation />;
};


export default App;
