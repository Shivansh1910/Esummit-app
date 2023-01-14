import React from 'react';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import { mapUrl } from '../../utils/helper';

interface ILocationProps {
  name: string;
  image: string;
  latitude: string;
  longitude: string;
}

export const Location = (props: ILocationProps) => {
  const url = mapUrl(props.latitude, props.longitude);
  return (
    <>
      <TouchableOpacity onPress={() => Linking.openURL(url as string)}>
        <View style={styles.container}>
          <Image
            source={{ uri: props.image }}
            style={styles.image}
            resizeMode="cover"
            blurRadius={0}
            borderRadius={5}
          />
          <Text style={styles.name}>{props.name}</Text>
        </View>
      </TouchableOpacity>
      <Divider style={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  name: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: '#D3D3D3',
    paddingVertical: 10,
  },
  divider: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#3D3C3C',
  },
});
