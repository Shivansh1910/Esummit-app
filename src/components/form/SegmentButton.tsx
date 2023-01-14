import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface ISegmentButtonProps {
  buttons: string[];
  value: string;
  onValueChange: any;
}

export const SegmentButton = (props: ISegmentButtonProps) => {
  const handlePress = (value: string) => {
    props.onValueChange(value);
  };

  return (
    <View
      style={[styles.container, { flexDirection: 'row', alignSelf: 'center' }]}>
      {props.buttons.map((button, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              props.value === button && styles.selectedButton,
              index === 0 && {
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              },
              index === props.buttons.length - 1 && {
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              },
            ]}
            onPress={() => handlePress(button)}>
            <Text
              style={[
                styles.buttonText,
                {
                  textTransform: 'uppercase',
                },
              ]}>
              {button}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#161616',
    borderColor: '#46B1EE',
    borderWidth: 1,
  },
  selectedButton: {
    backgroundColor: '#46B1EE',
    borderColor: '#46B1EE',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
};
