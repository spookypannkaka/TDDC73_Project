import React, { useState } from 'react';
import { Text, View } from 'react-native';
import AccountRegistrationForm from './AccountRegistrationForm'

export default function TestAccountRegistrationForm() {
    const [userData, setUserData] = useState(null);

    const handleFormSubmit = (formData) => {
      setUserData(formData);
    };
    
  return (
    <View>
      <AccountRegistrationForm onSubmit={handleFormSubmit} includedFields={['username', 'password', 'confirmPassword', 'gender']}/>
      {userData && (
        <Text>
          Submitted Data: {JSON.stringify(userData)}
        </Text>
      )}
    </View>
  );
}