jest.mock('react-native', () => {
    const actualReactNative = jest.requireActual('react-native');
    
    return {
      ...actualReactNative,
      StyleSheet: {
        ...actualReactNative.StyleSheet,
        create: jest.fn().mockImplementation((styles) => styles),
      },
      UIManager: {
        ...actualReactNative.UIManager,
        RCTView: () => {},
      },
      NativeModules: {
        ...actualReactNative.NativeModules,
        UIManager: { RCTView: {} },
        RNGestureHandlerModule: {
          attachGestureHandler: jest.fn(),
          createGestureHandler: jest.fn(),
          dropGestureHandler: jest.fn(),
          updateGestureHandler: jest.fn(),
          State: {},
          Directions: {},
        },
        PlatformConstants: {
          forceTouchAvailable: false,
        },
      },
    };
  });
  
jest.mock('react-native/Libraries/Settings/Settings', () => {
    return {
        get: jest.fn(),
        set: jest.fn(),
    };
});
