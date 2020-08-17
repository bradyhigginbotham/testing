import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setLocation: [`location`],
  setDebugLocation: [`location`],
  setLocationBlocked: [`blocked`],
});

export const LocationTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  location: { latitude: null, longitude: null },
  debugLocation: { },
  locationBlocked: false,
});

/* ------------- Selectors ------------- */

export const LocationSelectors = {
  selectLocation: state => state.location.location,
  selectDebugLocation: state => state.location.debugLocation,
  selectLocationBlocked: state => state.location.locationBlocked,
  selectEffectiveLocation: state => {
    if (state.location && state.location.debugLocation && state.location.debugLocation.location) {
      return state.location.debugLocation.location;
    } else {
      return state.location.location;
    }
  },
};

/* ------------- Reducers ------------- */

const setLocation = (state, { location }) =>
  state.merge({ location });

const setDebugLocation = (state, { location }) => 
  state.merge({ debugLocation:location });

const setLocationBlocked = (state, { blocked }) =>
  state.merge({ locationBlocked: blocked });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LOCATION]: setLocation,
  [Types.SET_DEBUG_LOCATION]: setDebugLocation,
  [Types.SET_LOCATION_BLOCKED]: setLocationBlocked,
});
