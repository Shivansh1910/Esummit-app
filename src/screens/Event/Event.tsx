import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator, FAB, SegmentedButtons} from 'react-native-paper';
import {useToast} from 'react-native-toast-notifications';
import {Footer} from '../../components/shared';
import {
  useSetReminderMutation,
  useSetTagMutation,
} from '../../hooks/mutation/user-action-mutation';
import {useEventById} from '../../hooks/query/events-query';
import {useGetTagsAndReminder} from '../../hooks/query/user-query';
import {useProfileStore} from '../../store/profile-store';

export const Event = ({route}) => {
  const {data: EventData, isLoading} = useEventById(route.params.id);

  const [value, setValue] = useState('');
  const [isNotified, setIsNotified] = useState(false);

  const email = useProfileStore(state => state.email);

  const {data: ReminderAndTagData, isLoading: ReminderAndTagLoading} =
    useGetTagsAndReminder(email, route.params.id);

  const {mutateAsync: setReminder} = useSetReminderMutation();

  const {mutateAsync: setTag} = useSetTagMutation();

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

  const handleNotify = async () => {
    setReminder({id: route.params.id, email: email}).then(data => {
      if (data.success) {
        toast.show('We will notify 15 minutes before the event', {
          type: 'success',
        });
      } else {
        toast.show('Some Error has occured. Please try again later.', {
          type: 'danger',
        });
      }
    });
  };

  const handleTag = async (val: string) => {
    setValue(val);
    setTag({id: route.params.id, email: email, tag: val}).then(data => {
      console.log('Tagged', data);
    });
  };

  return (
    <LinearGradient colors={['#BBD4E2', '#FFFFFF']} style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color="#4E8FB4"
          size="large"
          style={{marginTop: 20}}
        />
      ) : (
        <ScrollView>
          <Text style={styles.name}>{EventData?.data.name}</Text>
          <Image
            source={{uri: EventData?.data.image}}
            resizeMode={'contain'}
            style={{width: 200, height: 200, alignSelf: 'center'}}
          />
          <SegmentedButtons
            value={value}
            onValueChange={handleTag}
            style={{paddingVertical: 10}}
            buttons={[
              {
                value: 'interested',
                label: 'Intrested',
              },
              {
                value: 'going',
                label: 'Going',
              },
              {
                value: 'not going',
                label: 'Not Going',
              },
            ]}
          />

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.heading2}>Venue : </Text>
            <Text style={[styles.heading2, {fontFamily: 'Montserrat-Medium'}]}>
              {EventData?.data.venue}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.heading2}>Event On : </Text>
            <Text style={[styles.heading2, {fontFamily: 'Montserrat-Medium'}]}>
              Day {EventData?.data.day}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
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
    color: '#000000',
  },
  heading2: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#000000',
    textTransform: 'uppercase',
    paddingVertical: 3,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    borderTopColor: '#787878',
    width: '100%',
    borderTopWidth: 2,
    paddingVertical: 10,
  },
});
