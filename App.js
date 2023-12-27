import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

//import InputBox from './components/InputBox'
//import PasswordStrengthMeter from './components/PasswordStrengthMeter/PasswordStrengthMeter'
import TestPasswordStrengthMeter from './components/PasswordStrengthMeter/TestPasswordStrengthMeter'

export default function App() {
  const [password, setPassword] = useState('');
  
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
