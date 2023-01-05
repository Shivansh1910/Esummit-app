import React, {useState} from 'react';

import { StyleSheet, Text, TextInput, View} from 'react-native';
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
        style={[styles.input, {borderBottomColor: isValid ? '#46B1EE' : '#D10000'}]}
        value={props.value}
        onChangeText={handleTextChange}
      />
      <Button 
        title="Continue" 
        isDisabled={!isValid || !props.value}
        onPress={props.onSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  label: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 17,
    color: '#666666',
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    borderBottomColor:'#46B1EE',
    borderBottomWidth: 2,
    fontSize: 14,
    lineHeight: 17,
    padding: 0,
  },
});
