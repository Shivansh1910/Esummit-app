import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator, FAB, SegmentedButtons } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { SegmentButton } from '../../components/form';
import { Footer } from '../../components/shared';
import {
  useGetCoordinatesMutation,
  useSetReminderMutation,
  useSetTagMutation,
} from '../../hooks/mutation/user-action-mutation';
import { useEventById } from '../../hooks/query/events-query';
import { useGetTagsAndReminder } from '../../hooks/query/user-query';
import { useProfileStore } from '../../store/profile-store';
import { mapUrl } from '../../utils/helper';
import PushNotification from 'react-native-push-notification';

export const Event = ({ route }) => {
  const { data: EventData, isLoading } = useEventById(route.params.id);

  const [value, setValue] = useState('');
  const [isNotified, setIsNotified] = useState(false);

  const email = useProfileStore(state => state.email);

  const { data: ReminderAndTagData, isLoading: ReminderAndTagLoading } =
    useGetTagsAndReminder(email, route.params.id);

  const { mutateAsync: coordinates } = useGetCoordinatesMutation();

  const handleVenueClick = async () => {
    coordinates({ venue: EventData?.data.venue as string }).then(res => {
      if (res.success) {
        const url = mapUrl(res.data.latitude, res.data.longitude, EventData?.data.venue as string);
        return Linking.openURL(url as string);
      }
    });
  };

  const { mutateAsync: setReminder } = useSetReminderMutation();

  const { mutateAsync: setTag } = useSetTagMutation();

  const navigation = useNavigation();
  const toast = useToast();

  useEffect(() => {
    if (!ReminderAndTagLoading) {
      if (ReminderAndTagData?.data.tag) {
        setValue(ReminderAndTagData?.data.tag);
      }
      setIsNotified(ReminderAndTagData?.data.reminders || false);
    }
  }, [ReminderAndTagLoading]);

  const handleScheduleNotification = async () => {
    const description =
      EventData?.data.name +
      ' is starting in 15 minutes at ' +
      EventData?.data.venue +
      '.';
    PushNotification.localNotificationSchedule({
      channelId: 'fcm_fallback_notification_channel',
      title: EventData?.data.name,
      message: description,
      date: new Date(
        new Date(EventData?.data.startTime as string).getTime() +
          15 * 50 * 1000,
      ),
      allowWhileIdle: true,
      picture: EventData?.data.image,
      playSound: true,
      soundName: 'default',
      id: EventData?.data.id,
    });
  };

  const handleNotify = async () => {
    setReminder({ id: route.params.id, email: email }).then(data => {
      if (data.success) {
        handleScheduleNotification();
        toast.show('We will notify 15 minutes before the event', {
          type: 'success',
        });
        isNotified ? setIsNotified(false) : setIsNotified(true);
      } else {
        toast.show('Some Error has occured. Please try again later.', {
          type: 'danger',
        });
      }
    });
  };

  const handleTag = async (val: string) => {
    setTag({ id: route.params.id, email: email, tag: val }).then(data => {
      if (data.success) {
        if (val !== 'not going') {
          handleScheduleNotification();
        }
        toast.show('Response has been recorded', {
          type: 'success',
        });
        setValue(val);
      } else {
        toast.show('All Seats are full', {
          type: 'danger',
        });
      }
    });
  };

  return (
    <LinearGradient
      colors={['#1F292F', '#000000']}
      useAngle
      angle={-128.06}
      style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color="#4E8FB4"
          size="large"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <Text style={styles.name}>{EventData?.data.name}</Text>
          <Image
            source={{ uri: EventData?.data.image }}
            resizeMode={'cover'}
            style={{
              width: Dimensions.get('window').width,
              height: 200,
              alignSelf: 'center',
            }}
          />

          <SegmentButton
            value={value}
            onValueChange={handleTag}
            buttons={['interested', 'going', 'not going']}
          />
          <TouchableOpacity onPress={handleVenueClick}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.heading2}>Venue : </Text>
              <Text
                style={[styles.heading2, { fontFamily: 'Montserrat-Medium' }]}>
                {EventData?.data.venue}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.heading2}>Event On : </Text>
            <Text
              style={[styles.heading2, { fontFamily: 'Montserrat-Medium' }]}>
              Day {EventData?.data.day}
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.description}>
              {EventData?.data.description}
            </Text>
          </View>
        </ScrollView>
      )}
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 60,
        }}
        icon={isNotified ? 'bell-off' : 'bell-badge'}
        label={isNotified ? 'We will notify you' : 'Notify Me'}
        onPress={handleNotify}
      />
      <Footer navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
  },
  heading2: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    paddingVertical: 3,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#FFFFFF',
    borderTopColor: '#787878',
    width: '100%',
    borderTopWidth: 2,
    paddingVertical: 10,
  },
});
