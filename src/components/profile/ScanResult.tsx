import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Avatar, Button } from 'react-native-paper';
import { useDistributeKitMutation } from '../../hooks/mutation/user-action-mutation';
import { useMarkAttendaceQuery } from '../../hooks/query/user-query';
import { useToast } from 'react-native-toast-notifications';

interface IScanResultProps {
  email: string;
  close: any;
}

export const ScanResult = (props: IScanResultProps) => {
  const { data: qrCode, isLoading } = useMarkAttendaceQuery(props.email);

  const toast = useToast();
  const { mutateAsync } = useDistributeKitMutation();

  const isReg: boolean =
    qrCode?.data.pass_name != 'No' && qrCode?.data.pass_name != '';

  const handleDistributeKit = async () => {
    mutateAsync({ attendanceId: qrCode?.data.id }).then(res => {
      if (res.success) {
        toast.show('Updated', { type: 'success' });
        props.close();
      } else {
        toast.show('Failed. Try after sometime', { type: 'danger' });
        props.close();
      }
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} color="#4E8FB4" size="large" />
      ) : (
        <>
          {isReg ? (
            <>
              <Avatar.Icon
                size={100}
                icon="check"
                style={{ backgroundColor: 'green' }}
              />
              <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Allowed</Text>
            </>
          ) : (
            <>
              <Avatar.Icon
                size={100}
                icon="close"
                style={{ backgroundColor: 'red' }}
              />
              <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
                Allowed Denied
              </Text>
            </>
          )}
        </>
      )}
      <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
        {qrCode?.data.email}
      </Text>
      <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
        {qrCode?.data.pass_name} Pass
      </Text>
      <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
        Kit Recived:
        {qrCode?.data.isKitCollected ? (
          <Text style={{ color: 'green', fontSize: 20, fontWeight: 'bold' }}>
            YES
          </Text>
        ) : (
          <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>
            {' '}
            NO
          </Text>
        )}
      </Text>

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Button mode="contained" onPress={props.close}>
          Cancel
        </Button>

        {!qrCode?.data.isKitCollected && isReg && (
          <Button mode="contained" onPress={handleDistributeKit}>
            Give
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
});
