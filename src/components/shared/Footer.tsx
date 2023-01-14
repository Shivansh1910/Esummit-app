import React from 'react';

import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import EventMenuSvg from '../svgs/events';
import MapsMenuSvg from '../svgs/maps';
import MoreMenuSvg from '../svgs/more';
import { useNavigation, useRoute } from '@react-navigation/native';

export const Footer = ({ navigation }) => {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tabs, { opacity: route.name == 'Home' ? 1 : 0.6 }]}
        onPress={() => navigation.navigate('Home')}>
        <EventMenuSvg style={{ alignSelf: 'center' }} />
        <Text style={styles.text}>Events</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabs, { opacity: route.name == 'Map' ? 1 : 0.6 }]}
        onPress={() => navigation.navigate('Map')}>
        <MapsMenuSvg style={{ alignSelf: 'center' }} />
        <Text style={styles.text}>Locations</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabs, { opacity: route.name == 'More' ? 1 : 0.6 }]}
        onPress={() => navigation.navigate('More')}>
        <MoreMenuSvg style={{ alignSelf: 'center' }} />
        <Text style={styles.text}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 42,
    justifyContent: 'space-between',
    height: 56,
    backgroundColor: '#222324',
    position: 'absolute',
    bottom: 0,
  },
  tabs: {
    alignSelf: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 10,
    lineHeight: 12,
    paddingTop: 4,
    fontFamily: 'Montserrat-Bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
