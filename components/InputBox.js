import { StyleSheet, Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

/*
A text input box with a title on top.

Required props:
    title (string): The header title for the input box.

Optional props:
    value (string): The inputted text in the text box. Default is ''.
    onChange (function): The function that processes text change in the input box.
    secureTextEntry (bool): Masks text input. Default is false.
    isRequired (bool): Whether or not making an input in this box is mandatory or not. Default is false.
*/
export default function InputBox( { title, value, onChange, secureTextEntry, isRequired } ) {
    const mandatoryStyle = { color: 'red' };

    return (
        <View>
            <Text>{title} {isRequired && <Text style={mandatoryStyle}> *</Text>}</Text>
            <TextInput
                value={value}
                style={styles.boxStyle}
                onChangeText={onChange}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

// The prop types for this component and whether or not they are required.
InputBox.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    secureTextEntry: PropTypes.bool,
    isRequired: PropTypes.bool,
};

// The default prop values for this component.
InputBox.defaultProps = {
    value: '',
    secureTextEntry: false,
    isRequired: false,
};

const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: '#eee',
        border: '1px solid black',
    },
});