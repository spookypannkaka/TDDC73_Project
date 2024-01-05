# UI Testing for PasswordStrengthMeter
I did tests for the PasswordStrengthMeter component using Jest.

## Setup
The file ``PasswordStrengthMeter.test.js`` contains all the tests for the component.

The file ``jestSetupFile.js`` contains setup settings for the test. This file was needed for Node to mock React Native components in a virtual environment.

The file ``.babelrc`` configures Babel in order to ensure that Jest understands JavaScript and JSX.

I added
```
"scripts": {
"test": "jest"
},
"jest": {
    "preset": "react-native",
    "transform": {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    "setupFilesAfterEnv": [
        "./jestSetupFile.js"
    ]
},
```
to ``package.json`` to test using Jest.

I also had to install Babel and do things in a .babelrc file ?

## Running the test
I opened the root directory for TDDC73_Project and ran ``npm test``.

## Results

**Test File:** `components/PasswordStrengthMeter/PasswordStrengthMeter.test.js`

**Component:** PasswordStrengthMeter

### Test Summary
- **Test Suites:** 1 passed, 1 total
- **Tests:** 8 passed, 8 total
- **Snapshots:** 0 total
- **Time:** 2.032s

### Detailed Test Results

1. **Throws an exception when no password is provided**
   - Status: Passed
   - Time: 43 ms

2. **Renders correctly with minimum props**
   - Status: Passed
   - Time: 12 ms

3. **Displays correct strength label and color for various passwords**
   - Status: Passed
   - Time: 6 ms

4. **Enforces a minimum length for the password**
   - Status: Passed
   - Time: 3 ms

5. **Properly changes strength when using a different algorithm**
   - Status: Passed
   - Time: 2 ms

6. **Returns a strength of 5 when using an algorithm with value more than 5**
   - Status: Passed
   - Time: 2 ms

7. **Returns a strength of 0 when using an algorithm with value less than 0**
   - Status: Passed
   - Time: 2 ms

8. **Displays correct bar width for each strength level**
   - Status: Passed
   - Time: 3 ms

Ran all test suites successfully.
