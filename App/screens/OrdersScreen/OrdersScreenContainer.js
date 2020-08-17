import { connect } from 'react-redux';
import OrdersCreators from '../../Redux/OrdersRedux';
import OrdersScreen from './OrdersScreen';
import LocationCreators from '../../Redux/LocationRedux';

const mapStateToProps = ({ orders: { ordersList, ordersLoading }, location: { locationBlocked }, users: {user} }) => ({
  orders: ordersList,
  ordersLoading,
  locationBlocked,
  user,
});

const mapDispatchToProps = {
  fetchOrders: OrdersCreators.fetchOrders,
  claimOrder: OrdersCreators.claimOrder,
  setLocation: LocationCreators.setLocation,
  setLocationBlocked: LocationCreators.setLocationBlocked,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersScreen);
