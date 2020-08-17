import { availableOrders, myDeliveries } from './Fixtures/Order';

const routeOrders = [1, 2, 3, 4];

export default {
  // Functions return fixtures
  getOrders: () => ({
    ok: true,
    data: availableOrders,
  }),

  claimOrder: order => {
    deliveriesOrders.push(order);
    orders = orders.filter(o => o.id !== order.id);

    return {
      ok: true,
    };
  },

  getDeliveryOrders: () => ({
    ok: true,
    data: myDeliveries,
  }),
  
  routeOrders: () => ({
    ok: true,
    data: routeOrders,
  }),
};
