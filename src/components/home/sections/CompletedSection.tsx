import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Event } from '..';
import { IEventData } from '../../../types/api/events.types';
import FilterSvg from '../../svgs/filter';

interface ICompletedSectionProps {
  completedEvents: IEventData[] | undefined;
  filter: any;
}

export const CompletedSection = (props: ICompletedSectionProps) => {
  const navigation = useNavigation();

  const completedEvents = useMemo(() => {
    return (
      <View style={styles.events}>
        {props.completedEvents &&
          props.completedEvents.map((item, index) => (
            <Event
              key={index}
              id={item.id}
              url={item.image}
              event={item.name}
              description={item.description}
              venue={item.venue}
              startTime={item.startTime}
              endTime={item.endTime}
              category={item.category}
              navigation={navigation}
            />
          ))}
      </View>
    );
  }, [props.completedEvents]);

  return (
    <View style={styles.section}>
      {props.completedEvents && props.completedEvents.length > 0 && (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.heading}>Completed EVENTS</Text>
            <TouchableOpacity onPress={props.filter}>
              <FilterSvg />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'flex-start' }}>{completedEvents}</View>
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
  },
});
