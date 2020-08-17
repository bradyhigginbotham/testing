/* eslint-disable import/no-named-as-default-member */
import { put, call, select } from 'redux-saga/effects';
import RoutesCreators from '../Redux/RoutesRedux';
import eventEmitter from '../Services/EventEmitter';
import { LocationSelectors } from '../Redux/LocationRedux';
import { AuthenticationSelectors } from '../Redux/AuthenticationRedux';

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

function* doRecoverRoute(api) {
  try {
    const washrId = yield select(AuthenticationSelectors.selectUserId);

    let parameters = { washrId };

    let response;

    if (parameters) {
      response = yield api.request(
        [api.routes, api.routes.recoverRoute],
        parameters,
      );
    }

    if (response) {
      if (response.ok) {
        yield put(RoutesCreators.recoverRouteSuccess(response.data));
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

function startingCapacityFromOrders(orders) {
  return [0, ...orders].reduce((sum, o) => {
    if (o.status === `out_for_delivery`) {
      return sum + o.order_items.length;
    } else {
      return sum;
    }
  });
}

function destinationsFromOrders(orders) {
  return orders.map(o => {
    const capacity =
      o.status === `claimed` ? o.order_items.length : -1 * o.order_items.length;
    const type = o.status === `claimed` ? `pickup` : `dropoff`;

    const address =
      o.status === `claimed` ? o.pickup_address : o.delivery_address;
    const coordinates = { lat: address.latitude, lon: address.longitude };

    return {
      id: o.id,
      item: o,
      type,
      capacity,
      coordinates,
    };
  });
}

function* doGetRoute(api, { vehicleCapacity, destinations }) {
  try {
    const washrId = yield select(AuthenticationSelectors.selectUserId);
    const { latitude, longitude} = yield select(LocationSelectors.selectEffectiveLocation);
    const washrLocation = { lat: latitude, lon: longitude };

    let parameters = {
      washrLocation,
      vehicleCapacity,
      washrId,
      startingCapacity: startingCapacityFromOrders(destinations),
      destinations: destinationsFromOrders(destinations),
    };

    let response;

    if (parameters) {

      yield put(RoutesCreators.setGetRouteLoading(true));
      
      response = yield api.request(
        [api.routes, api.routes.getRoute],
        parameters,
      );
    }

    if (response) {
      if (response.ok) {
        yield put(RoutesCreators.getRouteSuccess(response.data));
      }
    } else {
      showErrorOrDefaultError();
    }
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    }
  } finally {
    yield put(RoutesCreators.setGetRouteLoading(false));
  }
}

export default {
  doGetRoute,
  doRecoverRoute,
};
