import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

/*

A React Native component that visualizes password strength in a horizontal bar.

Required props:
  password (string): The password to be processed.

Optional props:
  minLength (number): The minimum required length of the password. Default is 0.
  algorithm (function): The algorithm used to calculate password strength. Needs to return a number 0-5. Default is calculatePasswordStrength.
  
*/
export default function PasswordStrengthMeter( { password, minLength, algorithm } ) {

    // As the password prop is required, throw an exception if it is not properly defined
    if (typeof password !== 'string') {
        throw new Error('Password prop is required and must be a string');
    }

    let strength = algorithm(password, minLength);
    strength = validateStrength(strength);
    const barWidth = `${(strength / 5) * 100}%`;

    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Text>Password Strength: </Text>
                <Text style={{ fontWeight: 'bold', color: strengthColors[strength] }}>{strengthLabels[strength]}</Text>
            </View>
            <View style={styles.barContainer}>
                <View style={{ height: 10, width: barWidth, backgroundColor: strengthColors[strength] }} testID="strength-bar" />
            </View>
        </View>
    );
}

/*
The default function for calculating the strength of a password.
It returns a number of "strength points", ranging from 0 to 5, depending on what the password string contains.

A point is added if:
    The password contains more than 8 characters
    The password contains more than 12 characters
    The password contains lowercase and uppercase letters
    The password contains a number
    The password contains a special character

It returns a value of 0 if the minimum length requirement has not been reached.
*/
function calculatePasswordStrength(password, minLength) {
    if (password.length < minLength) return 0;

    let strengthPoints = 0;

    if (password.length > 8) strengthPoints++; // More than 8 characters
    if (password.length > 12) strengthPoints++; // More than 12 characters
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strengthPoints++; // Lowercase and uppercase characters
    if (/[0-9]/.test(password)) strengthPoints++; // Contains numerical character
    if (/[^A-Za-z0-9]/.test(password)) strengthPoints++; // Contains special character
  
    return strengthPoints; // Returns a number between 0 and 5
}

// Evaluates if the password strength algorithm is properly defined, and adjusts its returned value if not.
function validateStrength(value) {
    // Check if value is a number, if not return 0 as default strength
    if (typeof value !== 'number' || isNaN(value)) {
        return 0;
    }

    // Ensure the value is rounded and between 0 to 5
    value = Math.round(value);
    if (value < 0) return 0;
    if (value > 5) return 5;
    return value;
}


// The colors displayed in the horizontal bar for each corresponding level.
const strengthColors = [
    '#eee',    // Too Short
    '#ff3e36', // Weak
    '#ff691f', // Weak
    '#f9d835', // Fair
    '#a8ce38', // Good
    '#2ca86e', // Strong
];

// The text displayed for each corresponding level.
const strengthLabels = [
    'Too Short', // For score 0 or too short passwords
    'Weak',      // For score 1
    'Weak',      // For score 2
    'Fair',      // For score 3
    'Good',      // For score 4
    'Strong'     // For score 5
];

// The prop types for this component and whether or not they are required.
PasswordStrengthMeter.propTypes = {
    password: PropTypes.string.isRequired,
    minLength: PropTypes.number,
    algorithm: PropTypes.func,
};

// The default prop values for this component.
PasswordStrengthMeter.defaultProps = {
    minLength: 0,
    algorithm: calculatePasswordStrength,
};

const styles = StyleSheet.create({
    barContainer: {
        width: 200,
        height: 10,
        backgroundColor: '#eee',
        overflow: 'hidden',
    },
});