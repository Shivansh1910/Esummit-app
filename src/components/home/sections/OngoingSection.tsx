import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Event } from '..';
import { IEventData } from '../../../types/api/events.types';
import FilterSvg from '../../svgs/filter';

interface IOngoingSectionProps {
  onGoingEvents: IEventData[] | undefined;
  filter: any;
}

export const OngoingSection = (props: IOngoingSectionProps) => {
  const navigation = useNavigation();

  const onGoingEvents = useMemo(() => {
    return (
      <View style={styles.events}>
        {props.onGoingEvents &&
          props.onGoingEvents.map((item, index) => (
            <Event
              key={index}
              id={item.id}
              url={item.image}
              event={item.name}
              description={item.description}
              venue={item.venue}
              startTime={item.startTime}
              endTime={item.endTime}
              navigation={navigation}
            />
          ))}
      </View>
    );
  }, [props.onGoingEvents]);

  return (
    <View style={styles.section}>
      {props.onGoingEvents && props.onGoingEvents.length > 0 && (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[styles.heading, { alignSelf: 'center' }]}>
              ONGOING EVENTS
            </Text>
            <TouchableOpacity onPress={props.filter}>
              <FilterSvg />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>{onGoingEvents}</View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingTop: 5,
    paddingHorizontal: 24,
  },
  heading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  events: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    justifyContent: 'center',
  },
});
