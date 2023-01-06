import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
    color: '#000000',
    paddingVertical: 10,
  },
});
