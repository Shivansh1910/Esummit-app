import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';

interface IProfileSectionProps {
  name: string;
  email: string;
  image: string;
}

export const ProfileSection = (props: IProfileSectionProps) => (
  <View style={styles.container}>
    <Avatar.Image size={69} source={{ uri: props.image }} />
    <View style={styles.content}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.email}>{props.email}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  content: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    lineHeight: 24,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  email: {
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 18,
    color: '#FFFFFF',
    opacity: 0.6,
    textTransform: 'lowercase',
  },
});
