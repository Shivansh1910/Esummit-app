/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, type PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AppNavigation from './src/navigation/App';

// const Section: React.FC<
//   PropsWithChildren<{
//     title: string;
//   }>
// > = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const createChannel = () => {
  //   PushNotification.createChannel(
  //     {
  //       channelId: 'channel-id', // (required)
  //       channelName: 'My channel', // (required)
  //       channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
  //       playSound: true, // (optional) default: true
  //       soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  //       importance: 4, // (optional) default: 4. Int value of the Android notification importance
  //       vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  //     },
  //     created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  //   );
  // };

  // useEffect(() => {
  //   createChannel();
  // }, []);

  // const handleNotification = () => {
  //   PushNotification.localNotification({
  //     channelId: 'channel-id',
  //     title: 'My Notification Title', // (optional)
  //     message: 'My Notification Message', // (required)
  //   });
  // };

  // const handleScheduleNotification = () => {
  //   PushNotification.localNotificationSchedule({
  //     channelId: 'channel-id',
  //     title: 'My Notification', // (optional)
  //     message: 'My Notification Message', // (required)
  //     date: new Date(Date.now() + 10 * 1000), // in 10 secs
  //     allowWhileIdle: true
  //   });
  // };

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  // return (
  //   <SafeAreaView style={backgroundStyle}>
  //     <StatusBar
  //       barStyle={isDarkMode ? 'light-content' : 'dark-content'}
  //       backgroundColor={backgroundStyle.backgroundColor}
  //     />
  //     <ScrollView
  //       contentInsetAdjustmentBehavior="automatic"
  //       style={backgroundStyle}>
  //       <Header />
  //       <View
  //         style={{
  //           backgroundColor: isDarkMode ? Colors.black : Colors.white,
  //         }}>
  //         <Button title="Click Notification" onPress={handleNotification} />
  //         <Button
  //           title="Click Schedule Notification"
  //           onPress={handleScheduleNotification}
  //         />
  //         <Section title="Step One">
  //           Edit <Text style={styles.highlight}>App.tsx</Text> to change this
  //           screen and then come back to see your edits.
  //         </Section>
  //         <Section title="See Your Changes">
  //           <ReloadInstructions />
  //         </Section>
  //         <Section title="Debug">
  //           <DebugInstructions />
  //         </Section>
  //         <Section title="Learn More">
  //           Read the docs to discover what to do next:
  //         </Section>
  //         <LearnMoreLinks />
  //       </View>
  //     </ScrollView>
  //   </SafeAreaView>
  //     );
  return <AppNavigation />;
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
