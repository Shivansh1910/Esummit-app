import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const TimeTable = () => {
  return (
    <LinearGradient
      colors={['#1F292F', '#000000']}
      useAngle
      angle={-128.06}
      style={styles.container}>
        
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
