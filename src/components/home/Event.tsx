import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { getTime } from '../../utils/helper';

interface IEventBoxProps {
  id: string;
  url: string;
  event: string;
  venue: string;
  startTime: Date | undefined | string;
  endTime: Date | undefined | string;
  description: string;
  navigation: any;
  category: string
}

export const EventBox = (props: IEventBoxProps) => {
  const ImageComponent = useMemo(() => {
    return (
      <Image
        source={{ uri: props.url }}
        resizeMode={'cover'}
        style={styles.image}
      />
    );
  }, [props.url]);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigation.navigate('Event', { id: props.id })}>
      <View style={styles.container}>
        {ImageComponent}
        <View style={styles.flag}>
          <Text style={styles.flagText}>
            {getTime(props.startTime as Date)} - {getTime(props.endTime as Date)}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.event}>{props.event}</Text>
          <Text style={styles.venue}>{props.category}</Text>
          <Text style={styles.venue}>Venue : {props.venue}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    margin: 2,
  },
  flag: {
    width: 105,
    backgroundColor: '#5EBCF1',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    position: 'absolute',
    right: -3,
    top: 19,
  },
  flagText: {
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 11,
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
  },
  image: {
    height: Dimensions.get('window').width / 2 - 40,
    width: Dimensions.get('window').width / 2 - 40,
    borderRadius: 14,
  },
  content: {
    position: 'absolute',
    bottom: 10,
    left: 15,
  },
  event: {
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
    fontSize: 12,
    lineHeight: 15,
  },
  venue: {
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
    fontSize: 8,
    lineHeight: 10,
    textTransform: 'capitalize'
  },
});
