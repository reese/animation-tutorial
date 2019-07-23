/**
 * Defines the React 16 Adapter for Enzyme.
 *
 * @link http://airbnb.io/enzyme/docs/installation/#working-with-react-16
 * @copyright 2017 Airbnb, Inc.
 */
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { NativeModules } from 'react-native'
import { deactivateLogging } from './src/utils/Logger'

jest.useFakeTimers()
configure({ adapter: new Adapter() })

deactivateLogging()

const items = {} as any

jest.mock('@react-native-community/async-storage', () => ({
  AsyncStorage: {
    getItem: jest.fn(item => Promise.resolve(items[item])),
    removeItem: jest.fn(item => Promise.resolve(delete items[item])),
    setItem: jest.fn((item, value) => {
      return new Promise((resolve, reject) => {
        items[item] = value
        resolve(value)
      })
    }),
  },
}))

// Add navigator.geolocation to global object so importing
// react-native-geolocation-service doesn't cause jest to die
const globalAny: any = global
globalAny.navigator = {}
globalAny.navigator.geolocation = {}

/* https://github.com/expo/expo/blob/f882ffbc52ba910ecacefe264081e7eeb77c9665/packages/jest-expo/src/setup.js#L167-L199 */
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View')
  return {
    DrawerLayout: View,
    DrawerLayoutAndroid: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    NativeViewGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    ScrollView: View,
    Slider: View,
    State: {},
    Swipeable: View,
    Switch: View,
    TapGestureHandler: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    WebView: View,

    /* Buttons */
    BaseButton: View,
    BorderlessButton: View,
    RawButton: View,
    RectButton: View,

    /* Other */
    Directions: {},
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
  }
})

// https://github.com/react-native-community/react-native-device-info#troubleshooting
jest.mock('react-native-device-info', () => {
  return {
    getApplicationName: jest.fn(),
    getBuildNumber: jest.fn(),
    getDeviceId: jest.fn(),
    getReadableVersion: jest.fn(),
    getSystemName: jest.fn(),
    getSystemVersion: jest.fn(),
    getTimezone: jest.fn(),
  }
})

NativeModules.RNCNetInfo = {
  addListener: jest.fn(),
  getCurrentState: jest.fn(),
  removeListeners: jest.fn()
};
