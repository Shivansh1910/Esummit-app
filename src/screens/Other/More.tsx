import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Divider, List, Modal, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Contact,
  Faq,
  Follow,
  PdfComponent,
  Schedule,
} from '../../components/others';
import { Footer } from '../../components/shared';

export const More = () => {
  const [visible, setVisible] = React.useState(false);
  const [source, setSource] = React.useState('');

  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    height: '80%',
    width: '100%',
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView>
    <LinearGradient colors={['#1F292F', '#000000']} useAngle angle={-128.06} style={styles.container}>
        <ScrollView>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}>
              <PdfComponent url={source} />
            </Modal>
          </Portal>

          <Faq />

          <Schedule open={showModal} setSchedule={setSource} />

          <Divider style={styles.divider} />
          <Contact />
          <Divider style={styles.divider} />

          <View style={styles.content1}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: 16,
              }}
              onPress={() => navigation.navigate('Sponsors' as never)}>
              <Text style={styles.follow}>SPONSORS</Text>
              <List.Icon icon="chevron-right" color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.content1}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: 16,
              }}>
              <Text style={styles.follow}>About Us</Text>
              <List.Icon icon="chevron-right" color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Divider style={styles.divider} />

          <Follow />
          <Divider style={styles.divider} />
        </ScrollView>
      </LinearGradient>

      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: 50,
  },
  content1: {
    backgroundColor: '#161616',
  },
  follow: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    lineHeight: 18,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  divider: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#3D3C3C',
  },
});
