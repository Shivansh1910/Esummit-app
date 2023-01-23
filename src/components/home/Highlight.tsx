import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import LiveSvg from '../svgs/live';

interface IHighlightBoxProps {
  id: string;
  url: string;
  alt: string;
  index: number;
  length: number | undefined;
  isLive?: boolean;
  navigation: any;
}

export const HighlightBox = (props: IHighlightBoxProps) => {
  const ImageComponent = useMemo(() => {
    return (
      <>
        <Image
          source={{ uri: props.url }}
          resizeMode={'contain'}
          style={styles.image}
        />
        {props.isLive && (
          <LiveSvg style={{ position: 'absolute', top: 10, right: 10 }} />
        )}
      </>
    );
  }, [props.url]);

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => props.navigation.navigate('Event', { id: props.id })}>
      <View style={styles.container}>
        {ImageComponent}
        <View style={styles.content}>
          <Text style={styles.alt}>{props.alt}</Text>
          <View style={styles.dots}>
            {Array(props.length)
              .fill(0)
              .map((_, index) => {
                return (
                  <Text
                    key={index}
                    style={{
                      color: props.index == index ? '#fff' : '#D9D9D9',
                      marginHorizontal: 8,
                      fontSize: 10,
                    }}>
                    {'\u2B24'}
                  </Text>
                );
              })}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    marginHorizontal: 5,
  },
  image: {
    height: '100%',
    justifyContent: 'center',
  },
  content: {
    position: 'absolute',
    bottom: 22,
    left: 14,
    width: '100%',
  },
  alt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    lineHeight: 15,
    color: '#FFFFFF',
  },
  dots: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '92%',
  },
});
