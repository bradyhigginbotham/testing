import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setCapacity: ['capacity'],
  setDefaultMapApp: ['mapApp'],
  setRadius: ['radius'],
});

export const PreferencesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  carCapacity: null,
  defaultMapApp: null,
  radius: 15,
});

export const PreferencesSelectors = {
  selectCarCapacity: state => state.preferences.carCapacity,
  selectDefaultMapApp: state => state.preferences.defaultMapApp,
  selectRadius: state => state.preferences.radius,
};

/* ------------- Reducers ------------- */

export const setCapacity = (state, { capacity }) => state.merge({ carCapacity: capacity });
export const setDefaultMapApp = (state, { mapApp }) => state.merge({ defaultMapApp: mapApp });
export const setRadius = (state, { radius }) => state.merge({ radius });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CAPACITY]: setCapacity,
  [Types.SET_DEFAULT_MAP_APP]: setDefaultMapApp,
  [Types.SET_RADIUS]: setRadius,
});
