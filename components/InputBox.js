import { StyleSheet, Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

/*
A text input box with a title on top.

Required props:
    title (string): The header title for the input box.

Optional props:
    onChange (function): The function that processes text change in the input box.
    secureTextEntry (bool): Masks text input. Default is false.
*/
export default function InputBox( { title, onChange, secureTextEntry } ) {
    return (
        <View>
            <Text>{title}</Text>
            <TextInput
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
    onChange: PropTypes.func,
    secureTextEntry: PropTypes.bool
};

// The default prop values for this component.
InputBox.defaultProps = {
    secureTextEntry: false,
};

const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: '#eee',
    },
});