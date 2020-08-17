import '../Config';
import React, { useRef, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import Toast from 'react-native-easy-toast';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { PersistGate } from 'redux-persist/integration/react';
import eventEmitter from '../Services/EventEmitter';
import RootContainer from './RootContainer';
import createStore from '../Redux';
import DebugConfig from '../Config/DebugConfig';
import Notification from '../Components/Notification';
import theme from '../Themes/Theme';

const { store, persistor } = createStore();

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */

const App = () => {
  const toast = useRef(null);

  useEffect(() => {
    eventEmitter.on('showNotification', text =>
      {
        if (toast && toast.current) {
          toast.current.show(<Notification text={text} />, 3000)
        }
      }
    );
  }, []);

  const toastPosition = Dimensions.get('screen').height - getStatusBarHeight();

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toast
            style={{ backgroundColor: 'transparent' }}
            ref={toast}
            positionValue={toastPosition}
          />
          <RootContainer />
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
};

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron ? console.tron.overlay(App) : App;
