import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Button, List, Modal, Portal, RadioButton } from 'react-native-paper';
import { runOnJS } from 'react-native-reanimated';
import {
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import {
  scanBarcodes,
  BarcodeFormat,
  Barcode,
} from 'vision-camera-code-scanner';
import {
  AccomodationResult,
  EventAttendance,
  ScanResult,
} from '../../components/profile';
import { Validator } from '../../contants';
import { useEventByName } from '../../hooks/query/events-query';

export const QRCode = () => {
  const { data: EventName, isLoading } = useEventByName();
  const [hasPermission, setHasPermission] = useState(false);
  const [event, setEvent] = useState('Entry Attendance');

  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const devices = useCameraDevices();
  const device = devices.back;

  const [attendee, setAttendee] = useState<string>();

  const handleScan = async (codes: Barcode[]) => {
    if (codes.length > 0) {
      const code = codes[0].displayValue as string;
      setAttendee(code);
    }
  };

  const onClose = async () => {
    setAttendee(undefined);
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], {
      checkInverted: true,
    });
    runOnJS(handleScan)(detectedBarcodes);
  }, []);

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    setHasPermission(newCameraPermission === 'authorized');
  };

  useEffect(() => {
    checkPermission();
  }, []);

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
          <ScrollView>
            <View>
              <RadioButton.Group
                onValueChange={newValue => setEvent(newValue)}
                value={event}>
                <TouchableOpacity
                  onPress={() => {
                    setEvent('Entry Attendance');
                  }}>
                  <View style={styles.itemList}>
                    <RadioButton value={'Entry Attendance'} />
                    <Text style={styles.itemText}>{'Entry Attendance'}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setEvent('Accomodation');
                  }}>
                  <View style={styles.itemList}>
                    <RadioButton value={'Accomodation'} />
                    <Text style={styles.itemText}>{'Accomodation'}</Text>
                  </View>
                </TouchableOpacity>
                {EventName?.data.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        if (event === item.name) {
                          setEvent('Entry Attendance');
                        } else {
                          setEvent(item.name);
                        }
                      }}>
                      <View style={styles.itemList}>
                        <RadioButton value={item.name} />
                        <Text style={styles.itemText}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </RadioButton.Group>
            </View>
          </ScrollView>
          <View style={styles.modalFooter}>
            <Button mode="contained" onPress={hideModal}>
              Done
            </Button>
          </View>
        </Modal>
      </Portal>
      <View
        style={[
          styles.section,
          {
            height: 300,
            backgroundColor: 'black',
          },
        ]}>
        {device != null && hasPermission && (
          <>
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={!attendee}
              frameProcessor={frameProcessor}
              frameProcessorFps={5}
            />
            <Text style={styles.barcodeTextURL}>{attendee}</Text>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Button mode="contained" onPress={showModal}>
          TASK : {event}
        </Button>
      </View>
      <View style={styles.section}>
        <Text style={{ color: 'white', fontSize: 20 }}>Status</Text>
        {attendee &&
        Validator.email.test(attendee) &&
        event === 'Entry Attendance' ? (
          <ScanResult email={attendee} close={onClose} />
        ) : null}

        {attendee &&
        Validator.email.test(attendee) &&
        event === 'Accomodation' ? (
          <AccomodationResult email={attendee} close={onClose} />
        ) : null}

        {attendee &&
        Validator.email.test(attendee) &&
        event !== 'Entry Attendance' &&
        event !== 'Accomodation' ? (
          <EventAttendance email={attendee} event={event} close={onClose} />
        ) : null}

        {!attendee || !Validator.email.test(attendee) ? (
          <Text style={{ color: 'red', fontSize: 25, textAlign: 'center' }}>
            Please Scan the QR Code
          </Text>
        ) : null}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  containerStyle: {
    backgroundColor: '#BBD4E2',
    width: '70%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    maxHeight: Dimensions.get('window').width,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingTop: 10,
  },
  accordion: {
    backgroundColor: '#DCE9F0',
  },
  accordionTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#141415',
  },
  itemList: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  itemText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    textTransform: 'uppercase',
    color: '#141415',
  },
});
