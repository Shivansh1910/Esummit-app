import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { Social } from '../../contants';

export const Follow = () => {
  return (
    <View style={styles.content1}>
      <Text style={styles.follow}>FOLLOW US ON</Text>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#161616',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingBottom: 15,
        }}>
        <TouchableOpacity onPress={() => Linking.openURL(Social.insta)}>
          <Avatar.Image
            size={45}
            source={require('../../assets/images/insta.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(Social.twitter)}>
          <Avatar.Image
            size={45}
            source={require('../../assets/images/twitter.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(Social.linkedin)}>
          <Avatar.Image
            size={45}
            source={require('../../assets/images/linkedin.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(Social.fb)}>
          <Avatar.Image
            size={45}
            source={require('../../assets/images/fb.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(Social.yt)}>
          <Avatar.Image
            size={45}
            source={require('../../assets/images/yt.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content1: {
    borderBottomWidth: 1,
    borderColor: '#4E8FB4',
    backgroundColor: '#161616',
  },
  follow: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    lineHeight: 18,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
