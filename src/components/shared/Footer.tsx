import React from 'react';

import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import EventMenuSvg from '../svgs/events';
import MapsMenuSvg from '../svgs/maps';
import MoreMenuSvg from '../svgs/more';
import {useNavigation, useRoute} from '@react-navigation/native';

export const Footer = ({navigation}) => {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tabs}
        onPress={() => navigation.navigate('Home')}>
        <EventMenuSvg
          isActive={route.name == 'Home'}
          style={{alignSelf: 'center'}}
        />
        <Text style={styles.text}>Events</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabs}
        onPress={() => navigation.navigate('Map')}>
        <MapsMenuSvg
          isActive={route.name == 'Map'}
          style={{alignSelf: 'center'}}
        />
        <Text style={styles.text}>Locations</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabs}
        onPress={() => navigation.navigate('More')}>
        <MoreMenuSvg
          isActive={route.name == 'More'}
          style={{alignSelf: 'center'}}
        />
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
    backgroundColor: '#4E8FB4',
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
