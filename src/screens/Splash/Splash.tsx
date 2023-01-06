import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserDetailMutation } from '../../hooks/mutation/user-action-mutation';
import { useProfileStore } from '../../store/profile-store';
import LinearGradient from 'react-native-linear-gradient';
import LogoSvg from '../../components/svgs/logo';
import EcellSvg from '../../components/svgs/ecell';

export const Splash = () => {
  const navigation = useNavigation();

  const setProfile = useProfileStore(state => state.setProfile);

  const { mutateAsync: autoLogin } = useUserDetailMutation();

  const AutoLogin = async () => {
    const email = await AsyncStorage.getItem('email');
    if (email !== null) {
      console.log(email);
      autoLogin({ email }).then(res => {
        console.log(res);
        setProfile({
          email: email,
          image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
          name: 'Guest User',
          pass: 'Not Purchased',
          isSignedIn: true,
        });
        navigation.navigate('Home' as never);
      });
    } else {
      navigation.navigate('SignIn' as never);
    }
  };

  useEffect(() => {
    AutoLogin();
  }, []);

  return (
    <LinearGradient colors={['#BBD4E2', '#FFFFFF']} style={styles.container}>
      <LogoSvg />
      <View style={styles.section}>
        <Text style={styles.text}>from</Text>
        <EcellSvg width={87} height={100.5} />
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
    bottom: 57,
  },
  text: {
    color: '#203541',
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    lineHeight: 24,
    textTransform: 'lowercase',
  },
});
