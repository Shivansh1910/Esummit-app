import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
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
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#223139', '#161616']}
        useAngle={true}
        angle={-88.84}
        style={{ height: 214, alignItems: 'center', paddingTop: 100 }}>
        <Logo width={287} height={60} />
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
    </ScrollView>
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
    backgroundColor: '#161616',
    height: '100%',
  },
  heading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 23,
    lineHeight: 28,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  subheading: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 17,
    color: '#A2A2A2',
  },
  subheading2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 17,
    color: '#A2A2A2',
    textTransform: 'capitalize',
    paddingTop: 20,
    paddingBottom: 10,
  },
});
