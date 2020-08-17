import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setAvailability: ['available'],

  resetOrders: null,
  fetchOrders: null,
  fetchOrdersLoading: ['loading'],
  setOrders: ['orders'],

  claimOrder: ['order'],
  claimedOrder: ['order', 'deliveryOrders'],

  updateHamprStatus: ['orderId', 'hamprId', 'status'],
  updateHamprStatusLoading: ['loading'],
  updateHamprIdStatusLoading: ['hamprId', 'loading'],
  updatedHamprStatus: ['order'],

  resetDeliveryOrders: null,
  fetchDeliveryOrders: null,
  fetchDeliveryOrdersLoading: ['loading'],
  setDeliveryOrders: ['orders'],

  routeOrders: null,
  setOrdersRoute: ['route'],
  ordersRouteLoading: ['loading'],

  rejectOrder: ['orderId'],
  setRejectOrderLoading: ['loading'],
});

export const OrdersTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  available: false,

  ordersList: [],
  ordersLoading: false,

  updatedHampr: {},
  updateHamprStatusLoading: false,
  updateHamprIdStatusLoading: {},

  deliveryOrdersList: [],
  inProgressOrdersList: [],

  deliveryOrdersLoading: false,

  ordersRoute: [],
  ordersRouteLoading: false,

  rejectOrderLoading:  false,
});

/* ------------- Reducers ------------- */

export const setAvailability = (state, { available }) => state.merge({ available });

export const resetOrders = state => state.merge({ ordersList: [] });
export const fetchOrdersLoading = (state, { loading }) => state.merge({ ordersLoading: loading });

export const setOrders = (state, { orders }) => state.merge({ ordersList: orders });
export const claimedOrder = (state, { order, deliveryOrders }) => {
  
  const orders = state.ordersList.filter(o => o.id !== order.id);
  
  const deliveryOrdersList = deliveryOrders.filter(
    o => o.status === `claimed` || o.status === `out_for_delivery`,
  );
  const inProgressOrdersList = deliveryOrders.filter(
    o => o.status !== `claimed` && o.status !== `out_for_delivery`,
  );

  return state.merge({
    ordersList: orders,
    deliveryOrdersList,
    inProgressOrdersList,
  });
};

export const updatedHamprStatus = (state, { order }) => {
  let deliveryOrdersList = JSON.parse(JSON.stringify(state.deliveryOrdersList)).filter(o => o.id !== order.id);
  let inProgressOrdersList = JSON.parse(JSON.stringify(state.inProgressOrdersList)).filter(o => o.id !== order.id);

  if (order.status === `claimed` || order.status === `out_for_delivery`) {
    deliveryOrdersList.push(order);
  } else if (order.status !== `delivered`) {
    inProgressOrdersList.push(order);
  }
  
  return state.merge({
    updatedHampr: order,
    deliveryOrdersList,
    inProgressOrdersList,
  });
};

export const updateHamprStatusLoading = (state, { loading }) => state.merge({ updateHamprStatusLoading: loading });
export const updateHamprIdStatusLoading = (state, { hamprId, loading}) => {
  let updateHamprIdStatusLoading = JSON.parse(JSON.stringify(state.updateHamprIdStatusLoading));

  if (!hamprId.startsWith(`hampr_`)) {
    hamprId = `hampr_` + hamprId;
  }

  if (loading) {
    updateHamprIdStatusLoading[hamprId] = true;
  } else {
    delete updateHamprIdStatusLoading[hamprId];
  }
  return state.merge({updateHamprIdStatusLoading, updateHamprStatusLoading: loading});
}

export const resetDeliveryOrders = state => state.merge({ deliveryOrdersList: [] });
export const fetchDeliveryOrdersLoading = (state, { loading }) =>
  state.merge({ deliveryOrdersLoading: loading });

export const setDeliveryOrders = (state, { orders }) => {
  const deliveryOrdersList = orders.filter(
    o => o.status === `claimed` || o.status === `out_for_delivery`,
  );
  const inProgressOrdersList = orders.filter(
    o => o.status !== `claimed` && o.status !== `out_for_delivery`,
  );
  return state.merge({ deliveryOrdersList, inProgressOrdersList })
};

export const setOrdersRoute = (state, { route }) => state.merge({ ordersRoute: route });
export const ordersRouteLoading = (state, { loading }) =>
  state.merge({ ordersRouteLoading: loading });

  export const setRejectOrderLoading = (state, { loading }) =>
  state.merge({ rejectOrderLoading: loading });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_AVAILABILITY]: setAvailability,

  [Types.RESET_ORDERS]: resetOrders,
  [Types.FETCH_ORDERS_LOADING]: fetchOrdersLoading,
  [Types.SET_ORDERS]: setOrders,
  [Types.CLAIMED_ORDER]: claimedOrder,

  [Types.UPDATED_HAMPR_STATUS]: updatedHamprStatus,
  [Types.UPDATE_HAMPR_STATUS_LOADING]: updateHamprStatusLoading,
  [Types.UPDATE_HAMPR_ID_STATUS_LOADING]: updateHamprIdStatusLoading,

  [Types.RESET_DELIVERY_ORDERS]: resetDeliveryOrders,
  [Types.FETCH_DELIVERY_ORDERS_LOADING]: fetchDeliveryOrdersLoading,
  [Types.SET_DELIVERY_ORDERS]: setDeliveryOrders,

  [Types.SET_ORDERS_ROUTE]: setOrdersRoute,
  [Types.ORDERS_ROUTE_LOADING]: ordersRouteLoading,

  [Types.SET_REJECT_ORDER_LOADING]: setRejectOrderLoading,
});
