import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Location } from '../../components/map';
import { Footer } from '../../components/shared';
import { useVenues } from '../../hooks/query/other-query';

export const Maps = () => {
  const navigation = useNavigation();

  const { data: Venues, isLoading, refetch } = useVenues();

  const mapsData = useMemo(() => {
    return Venues?.map((item, index) => {
      return (
        <Location
          key={index}
          name={item.name}
          image={item.image}
          latitude={item.latitude}
          longitude={item.longitude}
        />
      );
    });
  }, [Venues]);

  return (
    <LinearGradient
      colors={['#1F292F', '#000000']}
      useAngle
      angle={-128.06}
      style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color="#4E8FB4"
          size="large"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                refetch();
              }}
            />
          }>
          <Text style={styles.title}>Venues</Text>
          {mapsData}
        </ScrollView>
      )}
      <Footer navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
