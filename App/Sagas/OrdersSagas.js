/* eslint-disable import/no-named-as-default-member */
import { put, call, select } from 'redux-saga/effects';
import OrdersCreators from '../Redux/OrdersRedux';
import eventEmitter from '../Services/EventEmitter';
import { LocationSelectors } from '../Redux/LocationRedux';
import { PreferencesSelectors } from '../Redux/PreferencesRedux';
import NavigationService from '../Services/NavigationService';

function showErrorOrDefaultError(response) {
  if (response && response.data && response.data.error && response.data.error.message) {
    eventEmitter.emit('showNotification', response.data.error.message);
  } else {
    eventEmitter.emit('showNotification', 'An unexpected error occurred');
  }
}

function* doFetchOrders(api) {
  try {
    yield put(OrdersCreators.fetchOrdersLoading(true));

    const { latitude, longitude } = yield select(LocationSelectors.selectEffectiveLocation);
    const radius = yield select(PreferencesSelectors.selectRadius);

    let parameters = {
      latitude,
      longitude,
      radius,
    };

    let response;

    if (parameters) {
      response = yield api.request(
        [api.orders, api.orders.getAvailableOrders],
        parameters,
      );
    }

    if (response) {
      if (response.ok) {
        yield put(OrdersCreators.setOrders(response.data));
      }
    } else {
      showErrorOrDefaultError();
    }
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    }
  } finally {
    yield put(OrdersCreators.fetchOrdersLoading(false));
  }
}

function* doClaimOrder(api, { order }) {
  try {

    let parameters = {
      orderId: order.id,
    };

    const response = yield api.request(
      [api.orders, api.orders.claimOrder],
      parameters,
    );
      
    if (response) {
      if (response.ok) {
        eventEmitter.emit(
          'showNotification',
          'Your order was successfully claimed! ',
        );
        yield put(OrdersCreators.claimedOrder(order, response.data));
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
  }
}

function* updateOrderHamprStatus(api, { orderId, hamprId, status} ) {
  try {
    
    let parameters = {
      orderId,
      hamprId,
      body: {
        status,
      }
    };

    yield put(OrdersCreators.updateHamprIdStatusLoading(hamprId, true));

    const response = yield api.request(
      [api.orders, api.orders.updateOrderHamprStatus],
      parameters,
    );

    if (response) {
      if (response.ok) {
        eventEmitter.emit(
          'showNotification',
          'The Hampr was updated successfully!',
        );
        yield put(OrdersCreators.updatedHamprStatus(response.data));
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
    yield put(OrdersCreators.updateHamprIdStatusLoading(hamprId, false));
  }
}

function* doFetchDeliveryOrders(api) {
  try {
    yield put(OrdersCreators.fetchDeliveryOrdersLoading(true));

    const response = yield yield api.request(
      [api.orders, api.orders.getProcessingOrders],
      undefined,
    );
      
    if (response) {
      if (response.ok) {
        yield put(OrdersCreators.setDeliveryOrders(response.data));
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
    yield put(OrdersCreators.fetchDeliveryOrdersLoading(false));
  }
}

function* doRouteOrders(api) {
  try {
    yield put(OrdersCreators.ordersRouteLoading(true));
    const response = yield call(api.routeOrders);

    if (response.ok) {
      yield put(OrdersCreators.setOrdersRoute(response.data));
    }
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    }
  } finally {
    yield put(OrdersCreators.ordersRouteLoading(false));
  }
}

function* rejectOrder(api, { orderId }) {
  try {
    let parameters = {
      orderId
    };

    yield put(OrdersCreators.setRejectOrderLoading(true));

    const response = yield api.request(
      [api.orders, api.orders.rejectOrder],
      parameters,
    );

    if (response) { 
      if (response.ok) {
        eventEmitter.emit(
          'showNotification',
          'The order was rejected! ',
        );
        yield put(OrdersCreators.setDeliveryOrders(response.data));
        yield call(NavigationService.goBack);

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
    yield put(OrdersCreators.setRejectOrderLoading(false));
  }
}

export default {
  doFetchOrders,
  doClaimOrder,
  updateOrderHamprStatus,
  doFetchDeliveryOrders,
  doRouteOrders,
  rejectOrder,
};
