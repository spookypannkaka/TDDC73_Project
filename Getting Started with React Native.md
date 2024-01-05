# Getting Started with React Native
This is a guide for setting up a React Native project. It explains installation of a project, as well as basic information on components, layouting, functions and navigation. It is aimed at programmers who are not already familiar with React Native.

## Environment and project set-up
Follow these steps to set up your React Native project.
1. Node.js needs to be installed. It can be installed from https://nodejs.org/en/download/current.
2. Open the terminal and navigate to the directory you would like to place your project in. For example, `cd desktop/ReactNative`
3. Run this command: `npx create-expo-app NameOfTheApp` and navigate to the project with `cd NameOfTheApp`, the name of the app being whatever you would like.
3. Run this command: `npx expo install react-native-web@~0.19.6 react-dom@18.2.0 @expo/webpack-config@^19.0.0
`
4. Run the project with `npm run web`.

Your project will now run in your default web browser. If you want to terminate the server, you can run CTRL+C inside the terminal.

## Start editing and basic layout
Your webpage will show an empty screen with the test "Open up App.js to start working on your app!". Let's go to the ``App.js`` file. It looks like the code below.

```
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

### Components in React Native
_Components_ can be described as objects/elements/building blocks in React Native. An app is composed of various components.

We can see two main React Native components here - ``<View>`` and ``<Text>``. ``<View>`` works a lot like a ``<div>`` in HTML and is a container where you can structure your project's contents. It is the most vital building block for creating a layout for your React Native app. ``<Text>`` displays text in the app. The base app also contains a ``<StatusBar>`` component that displays the system status like time and battery level on a mobile phone.

You can also create your own components with custom code to be used inside other components. For example, ``<App>`` is also a component.

You can read more about React Native's basic components here: https://reactnative.dev/docs/components-and-apis

### Styles and layout with Flexbox
CSS styles can be applied to React Native code with a ``StyleSheet``. In the code example above, we have a ``const styles`` variable that is used to style the ``<View>`` component with adding ``style={styles.container}``.

React Native supports a layouting tool called [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) for ordering of the components.
There are two things to layout: the _parent container_ and the _item children_. The container holds all items and using Flexbox to layout it defines how the children inside the component should be ordered. Using Flexbox for the items can provide dynamic changes to what they look like, for example making them grow inside the container.

By default, Flexbox is already defined in React Native. The default ``flex-direction`` is ``column`` and the ``flex`` variable only takes a single number. These single numbers define how much space of the container the component uses compared to other components in the same container.

[Read more about using Flexbox with React Native here.](https://reactnative.dev/docs/flexbox)

## Hooks: State and Effect
Hooks are special functions in React Native that let you "hook into" React features from function components. In this section two examples of very common hooks are explained, State and Effect.

### State
React Native uses _states_ to handle data inside the component. When the data is updated, the component is re-rendered.

Below is an example of state can be used with the ``useState`` hook.
```
import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';

const Button = () => {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    // Update the state, which will re-render this component with the new state
    setPressed(!pressed);
  };

  return (
    <Pressable onPress={handlePress}>
      <Text>{pressed ? 'Pressed!' : 'Press Me'}</Text>
    </Pressable>
  );
};
```
This is a button that changing a state of a button from _false_ to _true_ on whether or not it has been pressed. ``pressed`` is the variable that contains the state value, and ``setPressed`` is the function that changes the value variable.

[You can read more about State here.](https://reactnative.dev/docs/intro-react#state)

### Effect
Effects are used for computing "side effects" in components, which is additional code to be run after a state has been updated. Below is a code example for the ``useEffect`` hook.

```
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

function ExampleComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <Text onPress={() => setCount(count + 1)}>
      Press me! Count: {count}
    </Text>
  );
}

export default ExampleComponent;
```

This program uses ``useEffect`` to update the title of the webpage to reflect the number of counts after a counter button has been pressed. It also uses ``useState`` to store the value of the counts.

## Navigation between screens
Navigation is how users can access different screens in your app. [Read the official React Native Navigation documentation here.](https://reactnative.dev/docs/navigation)

Add navigation to your project by running this command in the root directory of your project:
``npm install @react-navigation/native @react-navigation/native-stack``

Below is an example of how navigation is used in React Native.
```
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from './components/HomeScreen'
import SecondScreen from './components/SecondScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="First" component={FirstScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Second" component={RepoScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

Above the component code we include the necessary import statements and create a stack with ``const Stack = createNativeStackNavigator();``. A stack in React Native can be a collection of screens. After including this, the entire app needs to be wrapped in a ``<NavigationContainer>`` component.

The ``<Stack.Navigator>`` manages a stack of screens. A ``<Stack.Screen>`` is the different screens you want in your project, and runs the components you provide them (in this case, the ``<FirstScreen>`` and ``<SecondScreen>`` components).

The ``<FirstScreen>`` component may look like the example below.
```
import React from 'react';
import { Button } from 'react-native';

const FirstScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to Second Screen"
      onPress={() => navigation.navigate('Second')}
    />
  );
};
```
Here, we have defined a button that takes the user to the second screen through ``onPress={() => navigation.navigate('Second')}``. If you want to go back to the previous screen instead, you can use ``onPress={() => navigation.goBack()}``.