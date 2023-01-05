import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useToast} from 'react-native-toast-notifications';
import {Button} from '.';
import {useVerifyOtpMutation} from '../../hooks/mutation/user-action-mutation';
import {useProfileStore} from '../../store/profile-store';

interface OtpBoxProps {
  length: number;
  handleResend: any;
}

export const OtpBox = (props: OtpBoxProps) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: props.length});
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const setProfile = useProfileStore(state => state.setProfile);

  const toast = useToast();

  const {mutateAsync: verifyOtpData} = useVerifyOtpMutation();

  const email = useProfileStore(state => state.email);

  const navigation = useNavigation();

  const handleVerify = async () => {
    verifyOtpData({email, value}).then(async res => {
      if (!res.success) {
        toast.show(res.data.error, {type: 'danger'});
      } else {
        toast.show('OTP verified successfully', {type: 'success'});
        await AsyncStorage.setItem('email', email);
        if (res.data.isGuest) {
          setProfile({
            email: email,
            image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
            name: 'Guest User',
            pass: 'Not Purchased',
            isSignedIn: true,
          });
        } else {
          setProfile({
            email: res.data.user.email,
            image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
            name: res.data.user.name,
            pass: res.data.user.pass_name,
            isSignedIn: true,
          });
        }
        navigation.navigate('Home' as never)
      }
    });
  };

  return (
    <>
      <View style={styles.container}>
        <CodeField
          ref={ref}
          value={value}
          onChangeText={setValue}
          cellCount={props.length}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <View>
        <TouchableOpacity onPress={props.handleResend}>
          <Text style={styles.resend}>Resend OTP</Text>
        </TouchableOpacity>
        <Button title="Verify and Continue" onPress={handleVerify} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  codeFiledRoot: {marginTop: 20},
  cell: {
    backgroundColor: '#DAEFFC',
    width: 54,
    height: 71,
    textAlign: 'center',
    borderRadius: 5,
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    lineHeight: 37,
    color: '#000000',
    marginHorizontal: 17,
    paddingTop: 15,
  },
  resend: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    lineHeight: 18,
    color: '#4E8FB4',
    textAlign: 'right',
    paddingRight: 10,
    paddingTop: 10,
  },
});
