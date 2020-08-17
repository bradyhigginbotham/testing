import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  recoverRoute: ['washrId'],
  recoverRouteSuccess: ['route'],

  getRoute: ['vehicleCapacity', 'destinations'],
  getRouteSuccess: ['route'],
  setGetRouteLoading: [`loading`],

  resetRoute: null,
});

export const RoutesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  route: undefined,
  getRouteLoading: false,
});

/* ------------- Reducers ------------- */

export const resetRoute = state => state.merge({ route: undefined });

export const recoverRouteSuccess = (state, { route }) => state.merge({ route });

export const getRouteSuccess = (state, { route }) => state.merge({ route });

export const setGetRouteLoading = (state, { loading }) => state.merge({getRouteLoading: loading});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_ROUTE]: resetRoute,
  [Types.RECOVER_ROUTE_SUCCESS]: recoverRouteSuccess,
  [Types.GET_ROUTE_SUCCESS]: getRouteSuccess,
  [Types.SET_GET_ROUTE_LOADING]: setGetRouteLoading,
});
