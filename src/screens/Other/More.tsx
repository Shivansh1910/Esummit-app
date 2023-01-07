import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Modal, Portal } from 'react-native-paper';
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
      <LinearGradient colors={['#BBD4E2', '#FFFFFF']} style={styles.container}>
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

          <Contact />

          <Follow />

          <View style={styles.content1}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Sponsors' as never)}>
              <Text style={styles.follow}>SPONSORS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content1}>
            <TouchableOpacity>
              <Text style={styles.follow}>About Us</Text>
            </TouchableOpacity>
          </View>
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
    borderBottomWidth: 1,
    borderColor: '#4E8FB4',
  },
  follow: {
    backgroundColor: '#F4F8FA',
    color: '#000000',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    lineHeight: 18,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
