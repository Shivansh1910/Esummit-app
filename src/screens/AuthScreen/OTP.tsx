import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useToast } from 'react-native-toast-notifications';
import { OtpBox } from '../../components/form';
import Logo from '../../components/svgs/logo';
import { useCreateOtpMutation } from '../../hooks/mutation/user-action-mutation';
import { useProfileStore } from '../../store/profile-store';

const TIMEOUT = 60 * 5;

export const OTPScreen = () => {
  const [timer, setTimer] = useState(TIMEOUT);

  const email = useProfileStore(state => state.email);

  const { mutateAsync: CreateOtp } = useCreateOtpMutation();

  const toast = useToast();

  const handleResend = () => {
    setTimer(TIMEOUT);
    CreateOtp({ email }).then(data => {
      if (data.success) {
        toast.show('OTP has been resent to your email', { type: 'success' });
      } else {
        toast.show('Some error has occured. Try again later', {
          type: 'danger',
        });
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#BBD4E2', '#CBDEE9']}
        style={{ height: 214, alignItems: 'center', paddingTop: 100 }}>
        <Logo width={334} height={76} />
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.heading}>VERIFY DETAILS</Text>
        <Text style={styles.subheading}>OTP sent to {email}</Text>

        {timer > 0 ? (
          <Text style={styles.subheading}>
            This OTP will expire in {timer} seconds
          </Text>
        ) : (
          <Text style={styles.subheading}>
            The OTP is expired. Please request a Resend OTP
          </Text>
        )}

        <Text style={styles.subheading2}>Enter OTP</Text>

        <OtpBox length={4} handleResend={handleResend} />
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
  },
  subheading2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 17,
    color: '#666666',
    textTransform: 'capitalize',
    paddingTop: 20,
    paddingBottom: 10,
  },
});
