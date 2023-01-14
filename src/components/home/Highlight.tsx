import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LiveSvg from '../svgs/live';

interface IHighlightBoxProps {
  url: string;
  alt: string;
  index: number;
  length: number;
  isLive?: boolean;
}

export const HighlightBox = (props: IHighlightBoxProps) => (
  <View style={styles.container}>
    <Image
      source={{ uri: props.url }}
      resizeMode={'contain'}
      style={styles.image}
    />
    {props.isLive && <LiveSvg style={{position:'absolute', top:10, right:10}}/>}
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
);

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
