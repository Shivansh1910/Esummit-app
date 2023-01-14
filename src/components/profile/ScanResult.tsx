import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { useMarkAttendaceQuery } from '../../hooks/query/user-query';

interface IScanResultProps {
  email: string;
}

export const ScanResult = (props: IScanResultProps) => {
  const { data: qrCode, isLoading } = useMarkAttendaceQuery(props.email);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} color="#4E8FB4" size="large" />
      ) : (
        <>
          {qrCode?.data.pass_name != 'No' && qrCode?.data.pass_name != '' ? (
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
        {qrCode?.data.pass_name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
});
