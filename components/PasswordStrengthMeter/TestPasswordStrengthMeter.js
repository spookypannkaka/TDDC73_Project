import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import InputBox from '../InputBox'
import PasswordStrengthMeter from './PasswordStrengthMeter'

export default function TestPasswordStrengthMeter() {
    const [password, setPassword] = useState('');
    const minLength = 6;

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'column'}}>
                <InputBox
                    title="Password"
                    onChange={(newPassword) => setPassword(newPassword)}
                    secureTextEntry={true}
                />
                {minLength != 0 && (
                    <Text>Minimum of {minLength} characters in length.</Text>
                )}
            </View>

            <PasswordStrengthMeter password={password} minLength={minLength} /*algorithm={customizePasswordStrengthAlgorithm}*/ />
        </View>
    );
}

/*
A testing function for passing in a customized strength algorithm to PasswordStrengthMeter.

Should return a number 0-5.
*/
function customizePasswordStrengthAlgorithm(password, minLength) {
    if (password.length < minLength) return 0;

    let strengthPoints = 0;

    if (password.length > 8) strengthPoints += 5;

    return strengthPoints;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
    },
});
  