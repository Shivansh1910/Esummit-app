import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useToast } from 'react-native-toast-notifications';
import { TextInput } from '../../components/form';
import Logo from '../../components/svgs/logo';
import { Validator } from '../../contants';
import { useCreateOtpMutation } from '../../hooks/mutation/user-action-mutation';
import { useProfileStore } from '../../store/profile-store';

export const SignInScreen = () => {
  const email = useProfileStore(state => state.email);
  const setEmail = useProfileStore(state => state.setEmail);

  const toast = useToast();

  const { mutateAsync: CreateOtp } = useCreateOtpMutation();

  const navigation = useNavigation();

  const handleSubmit = () => {
    CreateOtp({ email }).then(data => {
      if (data.success) {
        toast.show('OTP sent to your email', { type: 'success' });
        navigation.navigate('Otp' as never);
      } else {
        toast.show('Some error has occured. Try again later', {
          type: 'danger',
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#BBD4E2', '#CBDEE9']}
        style={{ height: 214, alignItems: 'center', paddingTop: 100 }}>
        <Logo width={334} height={76} />
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.heading}>Sign In</Text>
        <Text style={styles.subheading}>Enter your E-mail ID to proceed</Text>

        <TextInput
          label="Email Id"
          value={email}
          onChangeText={setEmail}
          validator={Validator.email}
          onSubmit={handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
  },
  section: {
    padding: 20,
  },
  heading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 23,
    lineHeight: 28,
    color: '#000000',
    textTransform: 'uppercase',
  },
  subheading: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 17,
    color: '#666666',
    textTransform: 'capitalize',
  },
});
