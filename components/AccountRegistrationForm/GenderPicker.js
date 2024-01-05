import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Picker } from '@react-native-picker/picker';

/*
Picker for choosing a gender between Male, Female, and Other.

Required props:
    -

Optional props:
    value (string): The chosen value for the picker. Default is ''.
    onChange (function): The function that processes input change in the picker.
    isRequired (bool): Whether or not making an input in this box is mandatory or not. Default is false.
*/
export default function GenderPicker( { value, onChange, isRequired } ) {
    const mandatoryStyle = { color: 'red' };

    return (
        <View>
            <Text>Gender {isRequired && <Text style={mandatoryStyle}> *</Text>}</Text>
            <Picker
                selectedValue={value}
                onValueChange={(itemValue) =>
                    onChange(itemValue)
            }>
                <Picker.Item label="Male" value="Male"/>
                <Picker.Item label="Female" value="Female"/>
                <Picker.Item label="Other / Don't specify" value="Other"/>
            </Picker>
        </View>
    );
}

// The prop types for this component and whether or not they are required.
GenderPicker.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    isRequired: PropTypes.bool,
};

// The default prop values for this component.
GenderPicker.defaultProps = {
    value: 'Male',
    isRequired: false,
};