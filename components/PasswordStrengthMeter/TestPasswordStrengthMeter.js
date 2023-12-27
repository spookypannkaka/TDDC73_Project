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

            <PasswordStrengthMeter password={password} minLength={minLength} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
    },
});
  