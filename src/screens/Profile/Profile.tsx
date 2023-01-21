import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Divider, List, Modal, Portal } from 'react-native-paper';
import { ProfileSection } from '../../components/profile';
import { useProfileStore } from '../../store/profile-store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CrossSvg from '../../components/svgs/cross';
import QRCode from 'react-native-qrcode-svg';
import { FLOW_STAGES } from '../../contants';
import { useFlowStore } from '../../store/flow-store';

export const Profile = () => {
  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);

  const name = useProfileStore(state => state.name);
  const email = useProfileStore(state => state.email);
  const image = useProfileStore(state => state.image);
  const pass = useProfileStore(state => state.pass);
  const qrcode = useProfileStore(state => state.qrcode);
  const setFlow = useFlowStore(state => state.setFlow);
  const isAdmin = useProfileStore(state => state.isAdmin);

  const navigation = useNavigation();

  const handleLogout = async () => {
    setFlow(FLOW_STAGES.AUTH);
    await AsyncStorage.removeItem('email');
    navigation.navigate('SignIn' as never);
  };

  return (
    <LinearGradient
      colors={['#1F292F', '#000000']}
      useAngle
      angle={-128.06}
      style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}>
          <LinearGradient
            colors={['#1F292F', '#000000']}
            useAngle
            angle={-128.06}>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                paddingRight: 10,
                paddingVertical: 5,
              }}
              onPress={hideModal}>
              <CrossSvg />
            </TouchableOpacity>
            {qrcode ? (
              <Image
                source={{
                  uri: qrcode,
                }}
                style={styles.qrImage}
              />
            ) : (
              <View
                style={{
                  backgroundColor: 'white',
                  alignItems: 'center',
                  marginHorizontal: 25,
                  paddingVertical: 30,

                  marginTop: 10,
                }}>
                <QRCode value={email} size={150} />
              </View>
            )}

            <Text style={styles.qrText}>
              Scan this QR code at the registration desk to get your pass.
            </Text>
          </LinearGradient>
        </Modal>
      </Portal>

      <ProfileSection name={name} email={email} image={image as string} />

      <TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.text}>Your Pass - </Text>
          <Text style={styles.boldText}>{pass}</Text>
        </View>
      </TouchableOpacity>
      <Divider style={styles.divider} />

      <TouchableOpacity onPress={()=>Linking.openURL('https://ecell.in/esummit/pass')}>
        <View style={[styles.section, { justifyContent: 'space-between' }]}>
          <Text style={styles.text}>Upgrade your Pass </Text>
          <List.Icon icon="chevron-right" color="#FFF" />
        </View>
      </TouchableOpacity>
      <Divider style={styles.divider} />

      <TouchableOpacity
        onPress={() => navigation.navigate('TimeTable' as never)}>
        <View style={[styles.section, { justifyContent: 'space-between' }]}>
          <Text style={styles.text}>My Schedule </Text>
          <List.Icon icon="chevron-right" color="#FFF" />
        </View>
      </TouchableOpacity>
      <Divider style={styles.divider} />

      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}>
        <View style={styles.section}>
          <Icon
            name="qr-code"
            size={20}
            style={{ paddingRight: 10 }}
            color="#FFF"
          />
          <Text style={styles.text}>Show QR Code </Text>
        </View>
      </TouchableOpacity>
      <Divider style={styles.divider} />

      {isAdmin ? (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate('QRCode' as never)}>
            <View style={styles.section}>
              <Icon
                name="qr-code"
                size={20}
                style={{ paddingRight: 10 }}
                color="#900"
              />
              <Text style={styles.text}>Scan QR Code </Text>
            </View>
          </TouchableOpacity>
          <Divider style={styles.divider} />
        </>
      ) : null}

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
    backgroundColor: 'transparent',
    paddingHorizontal: 30,
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    lineHeight: 22,
    color: '#FFFFFF',
  },
  boldText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    lineHeight: 22,
    color: '#FFFFFF',
  },
  logout: {
    backgroundColor: 'transparent',
    width: 200,
    borderRadius: 0,
    alignSelf: 'center',
    marginTop: 60,
    borderColor: '#4E8FB4',
    borderWidth: 1,
  },
  containerStyle: {
    backgroundColor: 'transparent',
    width: 300,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
  },
  modalBack: {
    backgroundColor: '#BBD4E2',
    position: 'absolute',
    right: 20,
    top: 0,
  },
  qrImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 10,
  },
  qrText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    lineHeight: 22,
    color: '#FFFFFF',
    padding: 10,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#3D3C3C',
  },
});
