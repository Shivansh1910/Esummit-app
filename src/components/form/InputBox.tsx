import React, { useState } from 'react';

import {
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '.';

interface IInputBoxProps {
  label?: string;
  value?: string;
  onChangeText: any;
  validator?: RegExp;
  onSubmit?: any;
}

export const InputBox = (props: IInputBoxProps) => {
  const [isValid, setIsValid] = useState(true);

  const handleTextChange = (text: string) => {
    props.validator && setIsValid(props.validator.test(text));
    props.onChangeText(text);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={[
          styles.input,
          { borderBottomColor: isValid ? '#46B1EE' : '#D10000' },
        ]}
        value={props.value}
        onChangeText={handleTextChange}
      />
      <Button
        title="Continue"
        isDisabled={!isValid || !props.value}
        onPress={props.onSubmit}
      />
      <Text
        style={{
          color: '#FFFFFF',
          textAlign: 'center',
          fontSize: 15,
          padding: 20,
        }}>
        OR
      </Text>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://ecell.in/esummit/reg/')}>
        <Text
          style={{
            color: '#46B1EE',
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161616',
    marginTop: 20,
  },
  label: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 17,
    color: '#A2A2A2',
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#161616',
    fontFamily: 'Montserrat-Regular',
    color: '#FFFFFF',
    borderBottomColor: '#46B1EE',
    borderBottomWidth: 2,
    fontSize: 14,
    lineHeight: 17,
    marginTop: 2,
    padding: 0,
  },
});
