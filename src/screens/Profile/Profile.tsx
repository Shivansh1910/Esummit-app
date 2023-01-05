import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-paper';
import {ProfileSection} from '../../components/profile';
import {Navbar} from '../../components/shared';
import {useProfileStore} from '../../store/profile-store';

export const Profile = () => {
  const name = useProfileStore(state => state.name);
  const email = useProfileStore(state => state.email);
  const image = useProfileStore(state => state.image);
  const pass = useProfileStore(state => state.pass);

  const navigation = useNavigation();

  const handleLogout = async() => {
    await AsyncStorage.removeItem('email');
    navigation.navigate('SignIn' as never);
  }

  return (
    <LinearGradient colors={['#BBD4E2', '#FFFFFF']} style={styles.container}>
      <Navbar navigation={navigation} />

      <ProfileSection name={name} email={email} image={image as string} />

      <TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.text}>Your Pass -</Text>
          <Text style={styles.boldText}>{pass}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.text}>Upgrade your Pass </Text>
        </View>
      </TouchableOpacity>

      <Button
        onPress={handleLogout}
        mode={'outlined'}
        textColor={'#000000'}
        style={styles.logout}>
        <Text style={styles.text}>Logout</Text>
      </Button>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#4E8FB4',
    borderTopColor: '#4E8FB4',
    borderTopWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 25,
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    lineHeight: 22,
    color: '#000000',
  },
  boldText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    lineHeight: 22,
    color: '#000000',
  },
  logout: {
    backgroundColor: '#FFFFFF',
    width: 200,
    borderRadius: 0,
    alignSelf: 'center',
    marginTop: 60,
    borderColor: '#4E8FB4',
    borderWidth: 1,
  },
});
