import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
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
import { ScanResult } from '../../components/profile';
import { Validator } from '../../contants';

export const QRCode = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [attendee, setAttendee] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [scaned, setScaned] = useState<string[]>([]);

  const handleScan = async (codes: Barcode[]) => {
    setIsLoading(true);
    if (codes.length > 0) {
      const code = codes[0].displayValue as string;
      setAttendee(code);
    } else {
      setAttendee(undefined);
      setIsLoading(false);
    }
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

    return () => {
      setScaned([]);
    };
  }, []);

  return (
    <LinearGradient
      colors={['#1F292F', '#000000']}
      useAngle
      angle={-128.06}
      style={styles.container}>
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
              isActive={true}
              frameProcessor={frameProcessor}
              frameProcessorFps={5}
            />
            <Text style={styles.barcodeTextURL}>{attendee}</Text>
          </>
        )}
      </View>
      <View style={styles.section}>
        <Text style={{ color: 'white', fontSize: 20 }}>Status</Text>
        {attendee && Validator.email.test(attendee) ? (
          <ScanResult email={attendee} />
        ) : (
          <Text style={{ color: 'red', fontSize: 25, textAlign: 'center' }}>
            Please Scan the QR Code
          </Text>
        )}
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
});
