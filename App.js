import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TestPasswordStrengthMeter from './components/PasswordStrengthMeter/TestPasswordStrengthMeter'
import TestAccountRegistrationForm from './components/AccountRegistrationForm/TestAccountRegistrationForm'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Testing account registration</Text>
      <TestAccountRegistrationForm />

      <Text>Testing password strength</Text>
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
    gap: 50,
  },
});
