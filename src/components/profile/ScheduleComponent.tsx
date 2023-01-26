import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getTime } from '../../utils/helper';

export const ScheduleComponent = ({ style, item }) => {
  return (
    <TouchableOpacity
      style={{
        ...style,
        backgroundColor: '#46B1EE',
        borderRadius: 10,
        elevation: 5,
      }}>
      <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text1}>
          Venue: {item.venue} | {getTime(item.startTime as Date)} -{' '}
          {getTime(item.endTime as Date)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 12,
  },
});
