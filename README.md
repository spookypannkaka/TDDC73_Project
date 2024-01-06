# TDDC73 Project
The project for the course TDDC73 Interaction Programming. The task was to implement an SDK for two UI patterns - I picked a password strength meter and an account registration form and developed them in React Native.

## Password Strength Meter
A horizontal bar that changes color and fill rate depending on how strong the inputted password is. The user is required to pass in a ``password`` to the component, and can optionally pass in a ``minLength`` and a custom ``algorithm`` for calculating password strength. This algorithm should return a value between 0 and 5.

## Account Registration Form
A highly customizable form for creating an account with custom fields and a submission button at the bottom. The user can create whatever fields they would like for the form through the ``includedFields`` array, and can specify which fields are required to fill in with the ``mandatoryFields`` array. The user is required to pass in an ``onSubmit`` function that handles the form submission. Submission generates user data that depends on the fields that are included.

## Getting Started and UI Testing
For this project I also wrote a guide on getting started on React Native, as well as performed testing for the PasswordStrengthMeter component. More details on these can be found in the corresponding md files in the root directory.
