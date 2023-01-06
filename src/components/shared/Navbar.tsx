import { useRoute } from '@react-navigation/native';
import React from 'react';

import { View, StyleSheet, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CrossSvg from '../svgs/cross';
import EcellSvg from '../svgs/ecell';
import UserSvg from '../svgs/user';

export const Navbar = ({ navigation }) => {
  const route = useRoute();

  const handleClick = () => {
    if (route.name === 'Profile') {
      navigation.goBack();
    } else {
      navigation.navigate('Profile');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <EcellSvg />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClick}>
        {route.name === 'Profile' ? <CrossSvg /> : <UserSvg />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#BBD4E2',
  },
});
