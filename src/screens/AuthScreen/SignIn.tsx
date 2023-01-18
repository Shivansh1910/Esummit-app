import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useToast } from 'react-native-toast-notifications';
import { TextInput } from '../../components/form';
import Logo from '../../components/svgs/logo';
import { ADMIN_EMAIL, FLOW_STAGES, Validator } from '../../contants';
import { useCreateOtpMutation } from '../../hooks/mutation/user-action-mutation';
import { useFlowStore } from '../../store/flow-store';
import { useProfileStore } from '../../store/profile-store';

export const SignInScreen = () => {
  const email = useProfileStore(state => state.email);
  const setEmail = useProfileStore(state => state.setEmail);

  const toast = useToast();

  const { mutateAsync: CreateOtp } = useCreateOtpMutation();

  const navigation = useNavigation();

  const setProfile = useProfileStore(state => state.setProfile);

  const setFlow = useFlowStore(state => state.setFlow);

  const handleSubmit = () => {
    if (email.toLowerCase() == ADMIN_EMAIL) {
      setProfile({
        email: email,
        image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
        name: 'Admin User',
        pass: 'Not Purchased',
        isSignedIn: true,
        isAdmin: true,
      });
      setFlow(FLOW_STAGES.MAIN);
      return;
    } else {
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
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#223139', '#161616']}
        useAngle={true}
        angle={-88.84}
        style={{ height: 214, alignItems: 'center', paddingTop: 100 }}>
        <Logo width={287} height={60} />
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
    height: Dimensions.get('window').height,
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
    textTransform: 'capitalize',
  },
});
