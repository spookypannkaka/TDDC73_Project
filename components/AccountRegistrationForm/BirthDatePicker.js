import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import RNDateTimePicker from '@react-native-community/datetimepicker';

/*
A picker for birth date. The date picker is not supported on web so I could not debug this.
*/
export default function BirthDatePicker({ title, date, onChange, isRequired }) {
  const mandatoryStyle = { color: 'red' };

  return (
    <View>
      <Text>{title} {isRequired && <Text style={mandatoryStyle}> *</Text>}</Text>
      <RNDateTimePicker display="spinner" />
    </View>
  );
};

BirthDatePicker.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
};

BirthDatePicker.defaultProps = {
  isRequired: false,
};