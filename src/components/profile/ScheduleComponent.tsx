import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const ScheduleComponent = ({ style, item }) => {
  return (
    <TouchableOpacity
      style={{
        ...style,
        backgroundColor: item.tag === 'interested' ? 'yellow' : 'green',
        borderRadius: 10,
        elevation: 5,
      }}>
      <View>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{item.venue}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    // color: '#FFFFFF',
    fontSize: 15,
  },
});
