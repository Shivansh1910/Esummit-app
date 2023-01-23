import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Event } from '..';
import { IEventData } from '../../../types/api/events.types';
import FilterSvg from '../../svgs/filter';

interface IUpcommingSectionProps {
  upcomingEvents: IEventData[] | undefined;
  filter: any;
}

export const UpcommingSection = (props: IUpcommingSectionProps) => {
  const navigation = useNavigation();

  const upcomingEvents = useMemo(() => {
    return (
      <View style={styles.events}>
        {props.upcomingEvents &&
          props.upcomingEvents.map((item, index) => (
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
  }, [props.upcomingEvents]);

  return (
    <View style={styles.section}>
      {props.upcomingEvents && props.upcomingEvents.length > 0 && (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.heading}>UPCOMING EVENTS</Text>
            <TouchableOpacity onPress={props.filter}>
              <FilterSvg />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>{upcomingEvents}</View>
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
