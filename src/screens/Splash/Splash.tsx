import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserDetailMutation } from '../../hooks/mutation/user-action-mutation';
import { useProfileStore } from '../../store/profile-store';
import LinearGradient from 'react-native-linear-gradient';
import LogoSvg from '../../components/svgs/logo';
import EcellSvg from '../../components/svgs/ecell';
import { useFlowStore } from '../../store/flow-store';
import { ADMIN_EMAIL, FLOW_STAGES } from '../../contants';

export const Splash = () => {
  const setFlow = useFlowStore(state => state.setFlow);

  const setProfile = useProfileStore(state => state.setProfile);

  const { mutateAsync: autoLogin } = useUserDetailMutation();

  const AutoLogin = async () => {
    const email = await AsyncStorage.getItem('email');
    if (email !== null) {
      if (email == ADMIN_EMAIL) {
        setProfile({
          email: email,
          image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
          name: 'Admin User',
          pass: 'Not Purchased',
          isSignedIn: true,
          isAdmin: true,
        });
        setFlow(FLOW_STAGES.MAIN);
      } else {
        autoLogin({ email }).then(res => {
          if (res.success) {
            setProfile({
              email: email,
              image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
              name: res.data.isGuest ? 'Guest User' : res.data.user.name,
              pass: res.data.isGuest
                ? 'Not Purchased'
                : res.data.user.pass_name,
              isSignedIn: true,
            });
            setFlow(FLOW_STAGES.MAIN);
          } else {
            setFlow(FLOW_STAGES.AUTH);
          }
        });
      }
    } else {
      setFlow(FLOW_STAGES.AUTH);
    }
  };

  useEffect(() => {
    AutoLogin();
  }, []);

  return (
    <LinearGradient colors={['#2C4553', '#000000']} style={styles.container}>
      <LogoSvg />
      <View style={styles.section}>
        <Text style={styles.text}>from</Text>
        <EcellSvg width={85.6} height={90} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 28,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    lineHeight: 24,
    textTransform: 'lowercase',
  },
});
