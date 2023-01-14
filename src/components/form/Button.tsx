import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

interface IButtonProps {
  title: string;
  isDisabled?: boolean;
  onPress?: any;
}

export const ButtonBox = (props: IButtonProps) => {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        style={styles.button}
        buttonColor={props.isDisabled ? '#2E6382' : '#46B1EE'}
        onPress={!props.isDisabled && props.onPress}>
        <Text style={[styles.buttonText, {color: props.isDisabled ? '#96B1C0': '#FFFFFF'}]}>{props.title}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 11,
    paddingVertical: 9,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
    lineHeight: 21,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
});
