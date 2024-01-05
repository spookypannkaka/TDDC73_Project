import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import PropTypes from 'prop-types';

import InputBox from '../InputBox'
import GenderPicker from './GenderPicker'

/*

An account registration form with customizable fields. Users can specify which fields they want to include in the form and upon submission
user data with matching fields is generated.

Required props:
  onSubmit (function): Processes the form state at submission and sends it back to the user.

Optional props:
  includedFields (array of strings): Creates input fields for the values in the array. Default is ['username','password'].
  mandatoryFields (array of strings): Indicates which fields are mandatory for the user to fill in to submit the form. Default is ['username','password'].

Special input field strings:
  'gender' provides a picker for choosing a gender.
  'confirmPassword' makes it impossible to submit the form unless the input in the field matches with 'password'.
  'termsOfUse' does not currently return a field, as this is meant to return a checkbox (that is not currently working).
Any input field other than these return a normal input box.

*/
export default function AccountRegistrationForm({
  onSubmit,
  includedFields = [],
  mandatoryFields = [],
}) {

  // Setup for the form that returns user data.
  const getInitialFormState = () => {
    const initialState = {};

    includedFields.forEach(field => {
      // Initialize strings in fields. Initialize as a bool and not a string if terms of use is included.
      initialState[field] = field === 'termsOfUse' ? false : '';
    });

    return initialState;
  };
  const [formState, setFormState] = useState(getInitialFormState());

  // Function is called when the user updates an input field. The user data form is updated.
  const handleInputChange = (name, value) => {
    let newValue;
    if (name === 'birthDate') {
      // If the field is 'birthDate', convert the Date object to a string
      newValue = value.toISOString();
    } else {
      newValue = value;
    }

    setFormState({ ...formState, [name]: newValue });
  };    

  // Checks if all fields that are marked as "mandatory" contain an input string.
  const areMandatoryFieldsFilled = () => {
    return mandatoryFields.every(field => formState[field] && formState[field].trim() !== '');
  };

  // Function is called when the Submit button is clicked and sends the form data back to the parent component.
  const handleSubmit = () => {
    // Check if mandatory fields are filled in.
    if (areMandatoryFieldsFilled()) {

      // Check if both Password and Confirm Password fields are included.
      if (includedFields.includes('password') && includedFields.includes('confirmPassword')) {

        // Check if the inputted passwords match.
        if (formState.password != formState.confirmPassword) {
          alert("Password does not match");
        } else {
          onSubmit(formState);
        }

      } else {
        onSubmit(formState);
      }
    } else {
      alert("Please fill all required fields");
    }
  };

  // This function is for generating the matching titles for the input boxes, capitalizing the first letter.
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Renders an input field depending on the string input.
  const renderField = (field) => {
    const isRequired = mandatoryFields.includes(field);

    switch (field) {
      case 'gender':
        return <GenderPicker value={formState.gender} onChange={(value) => handleInputChange('gender', value)} isRequired={mandatoryFields.includes('gender')} />;
      // Birth date is not working currently
      /*case 'birthDate':
        return <BirthDatePicker title="Birth Date" date={new Date(formState.birthDate || Date.now())} onChange={(date) => handleInputChange('birthDate', date)} isRequired={mandatoryFields.includes('birthDate')} />;
      */
      case 'termsOfUse':
        return null;
      default:
        return (
          <InputBox
            key={field}
            title={capitalizeFirstLetter(field.replace(/([A-Z])/g, ' $1'))}
            value={formState[field]}
            onChange={(value) => handleInputChange(field, value)}
            secureTextEntry={field === 'password' || field === 'confirmPassword'}
            isRequired={isRequired}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Render chosen fields */}
      {includedFields.map(field => renderField(field))}

      {/* If included, the Terms Of Use checkbox should be at the bottom. However, I can't get the CheckBox to work. */}
      {/*includedFields.includes('termsOfUse') && (
          <View>
            <CheckBox
                disabled={false}
                value={formState.termsOfUse}
                onValueChange={(newValue) => handleInputChange('termsOfUse', newValue)}
            />
            <Text>I accept the Terms of Use</Text>
        </View>        
      )*/}

      <Pressable style={styles.button} onPress={handleSubmit}><Text>Register</Text></Pressable>
    </View>
  );
}

// The prop types for this component and whether or not they are required.
AccountRegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  includedFields: PropTypes.arrayOf(PropTypes.string),
  mandatoryFields: PropTypes.arrayOf(PropTypes.string),
};

// The default prop values for this component.
AccountRegistrationForm.defaultProps = {
  includedFields: ['username', 'password'],
  mandatoryFields: ['username','password'],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    border: '5px solid blue',
    borderRadius: 5,
  }
});