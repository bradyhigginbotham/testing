import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getPerformance: null,
  performanceSuccess: [`data`],
  setPerformanceLoading: [`loading`],
});

export const EarningsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  performance: { pending_amount: null, payout_amount: null },
  performanceLoading: false,
});

/* ------------- Selectors ------------- */

export const LocationSelectors = {
  selectPerformance: state => state.earnings.performance,
};

/* ------------- Reducers ------------- */

const performanceSuccess = (state, { data }) => state.merge({ performance: data });

const setPerformanceLoading = (state, { loading }) =>
  state.merge({ performanceLoading: loading });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PERFORMANCE_SUCCESS]: performanceSuccess,
  [Types.SET_PERFORMANCE_LOADING]: setPerformanceLoading,
});
