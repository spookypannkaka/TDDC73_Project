import React from 'react';
import { StyleSheet, View } from 'react-native';

import TestPasswordStrengthMeter from './components/PasswordStrengthMeter/TestPasswordStrengthMeter'

export default function App() {
  return (
    <View style={styles.container}>
      <TestPasswordStrengthMeter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5881af',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
