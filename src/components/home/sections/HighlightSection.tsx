import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Highlight } from '..';
import { IEventData } from '../../../types/api/events.types';

interface IHighlightSectionProps {
  highlights: IEventData[] | undefined;
}

export const HighlightSection = (props: IHighlightSectionProps) => {
  const navigation = useNavigation();

  const highlightEvents = useMemo(() => {
    return (
      props.highlights && (
        <PagerView style={styles.pagerView} initialPage={0}>
          {props.highlights.map((item, index) => (
            <View key={index}>
              <Highlight
                url={item.image}
                alt={item.name}
                id={item.id}
                index={index}
                length={props.highlights?.length}
                isLive={
                  new Date(item.startTime) < new Date() &&
                  new Date(item.endTime) > new Date()
                }
                navigation={navigation}
              />
            </View>
          ))}
        </PagerView>
      )
    );
  }, [props.highlights]);

  return (
    <View style={styles.section}>
      {props.highlights && (
        <>
          <Text style={styles.heading}>HIGHLIGHT SESSIONS</Text>
          {highlightEvents}
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
  pagerView: {
    height: 180,
    marginTop: 10
  },
});
