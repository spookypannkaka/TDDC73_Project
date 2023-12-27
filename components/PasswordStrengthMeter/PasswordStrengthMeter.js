import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

/*
A React Native component that visualizes password strength in a horizontal bar.

Required props:
  password (string): The password to be processed.

Optional props:
  minLength (number): The minimum required length of the password. Default is 0.

*/
export default function PasswordStrengthMeter( { password, minLength } ) {
    const strength = calculatePasswordStrength(password, minLength);
    const barWidth = `${(strength / 5) * 100}%`;

    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Text>Password Strength: </Text>
                <Text style={{ fontWeight: 'bold', color: strengthColors[strength] }}>{strengthLabels[strength]}</Text>
            </View>
            <View style={styles.barContainer}>
                <View style={{ height: 10, width: barWidth, backgroundColor: strengthColors[strength] }} />
            </View>
        </View>
    );
}

/*
The function for calculating the strength of a password.
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

// The colors displayed in the horizontal bar for each corresponding level.
const strengthColors = [
    '#eee', // Too Short
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
};

// The default prop values for this component.
PasswordStrengthMeter.defaultProps = {
    minLength: 0,
};

const styles = StyleSheet.create({
    barContainer: {
        width: 200,
        height: 10,
        backgroundColor: '#eee',
        overflow: 'hidden',
    },
  });
  