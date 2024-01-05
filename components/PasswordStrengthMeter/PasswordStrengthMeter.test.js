import React from 'react';
import { render } from '@testing-library/react-native';
import PasswordStrengthMeter from './PasswordStrengthMeter'; // Adjust the import path as needed

describe('PasswordStrengthMeter Component', () => {

  // Test to ensure component throws an exception when no password is provided
  it('Throws an exception when no password is provided', () => {
    expect(() => render(<PasswordStrengthMeter />)).toThrow('Password prop is required');
  });

  // Test for rendering component with minimum props
  it('Renders correctly with minimum props', () => {
    const { getByText } = render(<PasswordStrengthMeter password="TestPass123!" />);
    expect(getByText(/Password Strength:/i)).toBeTruthy();
  });

  // Testing different password strengths
  it('Displays correct strength label and color for various passwords', () => {
    const { getByText, rerender } = render(<PasswordStrengthMeter password="short" />);
    expect(getByText('Too Short')).toBeTruthy();

    // Test for a weak password
    rerender(<PasswordStrengthMeter password="slightlylonger" />);
    expect(getByText('Weak')).toBeTruthy();

    // Test for a strong password
    rerender(<PasswordStrengthMeter password="MuchLongerPass123!" />);
    expect(getByText('Strong')).toBeTruthy();
  });

  // Test for handling minLength prop
  it('Enforces a minimum length for the password', () => {
    const minLength = 10;
    const { getByText, rerender } = render(<PasswordStrengthMeter password="short" minLength={minLength} />);
    expect(getByText('Too Short')).toBeTruthy();

    rerender(<PasswordStrengthMeter password="longenoughpassword" minLength={minLength} />);
    expect(getByText(/Password Strength:/i)).toBeTruthy();
  });

  // Test changing algorithm prop
  it('Properly changes strength when using a different algorithm', () => {
    const mockAlgorithm = jest.fn().mockReturnValue(5); // Always returns the highest strength
    const { getByText } = render(<PasswordStrengthMeter password="password" algorithm={mockAlgorithm} />);
    expect(mockAlgorithm).toHaveBeenCalled();
    expect(getByText('Strong')).toBeTruthy(); // Should display 'Strong' since mock always returns 5
  });

  // Tests that the highest strength is returned when providing an algorithm that returns a value higher than the max
  it('Returns a strength of 5 when using an algorithm with value more than 5', () => {
    const mockAlgorithm = jest.fn().mockReturnValue(6); // Always returns the highest strength
    const { getByText } = render(<PasswordStrengthMeter password="password" algorithm={mockAlgorithm} />);
    expect(mockAlgorithm).toHaveBeenCalled();
    expect(getByText('Strong')).toBeTruthy(); // Should display 'Strong' since mock always returns 5
  });

  // Tests that the lowest strength is returned when providing an algorithm that returns a negative value
  it('Returns a strength of 0 when using an algorithm with value less than 0', () => {
    const mockAlgorithm = jest.fn().mockReturnValue(-1); // Always returns the highest strength
    const { getByText } = render(<PasswordStrengthMeter password="password" algorithm={mockAlgorithm} />);
    expect(mockAlgorithm).toHaveBeenCalled();
    expect(getByText('Too Short')).toBeTruthy(); // Should display 'Too Short' since mock always returns 0
  });

  // Test for correct bar width based on strength
  it('Displays correct bar width for each strength level', () => {
    const { getByTestId, rerender } = render(<PasswordStrengthMeter password="pass" />);
    let bar = getByTestId('strength-bar');
    expect(bar.props.style).toEqual(expect.objectContaining({ width: '0%' }));

    rerender(<PasswordStrengthMeter password="MuchLongerPass123!" />);
    bar = getByTestId('strength-bar');
    expect(bar.props.style).toEqual(expect.objectContaining({ width: '100%' }));
  });
});

