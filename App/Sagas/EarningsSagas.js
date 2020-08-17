/* eslint-disable import/no-named-as-default-member */
import { put, call, select } from 'redux-saga/effects';
import EarningsCreators from '../Redux/EarningsRedux';
import eventEmitter from '../Services/EventEmitter';

function showErrorOrDefaultError(response) {
  if (
    response &&
    response.data &&
    response.data.error &&
    response.data.error.message
  ) {
    eventEmitter.emit('showNotification', response.data.error.message);
  } else {
    eventEmitter.emit('showNotification', 'An unexpected error occurred');
  }
}

function* getPerformance(api) {
  try {

    let parameters = {  };

    let response;

    if (parameters) {
      yield put(EarningsCreators.setPerformanceLoading(true));
      response = yield api.request([api.earnings, api.earnings.getPerformance], parameters);
    }

    if (response) {
      if (response.ok) {
        yield put(EarningsCreators.performanceSuccess(response.data));
      } else {
        showErrorOrDefaultError(response);
      }
    } else {
      showErrorOrDefaultError();
    }
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    }
  } finally {
    yield put(EarningsCreators.setPerformanceLoading(false));
  }
}

export default {
  getPerformance,
};