import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import configureStore from './CreateStore';
import rootSaga from '../Sagas';
import ReduxPersist from '../Config/ReduxPersist';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  authentication: require('./AuthenticationRedux').reducer,
  orders: require('./OrdersRedux').reducer,
  preferences: require('./PreferencesRedux').reducer,
  startup: require('./StartupRedux').reducer,
  location: require(`./LocationRedux`).reducer,
  routes: require('./RoutesRedux').reducer,
  users: require('./UsersRedux').reducer,
  earnings: require('./EarningsRedux').reducer,
});

export default () => {
  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig;
    finalReducers = persistReducer(persistConfig, reducers);
  }

  let { store, persistor, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../Redux').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../Sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas);
      });
    });
  }

  return { store, persistor };
};
