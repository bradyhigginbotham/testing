import { connect } from 'react-redux';
import OrdersCreators from '../../Redux/OrdersRedux';
import RoutesCreators from '../../Redux/RoutesRedux';
import MyOrdersScreen from './MyOrdersScreen';

const mapStateToProps = ({ orders: { deliveryOrdersList, deliveryOrdersLoading }, routes: { route }, location: { location } }) => ({
  route,
  deliveryOrders: deliveryOrdersList,
  deliveryOrdersLoading,
  userLocation: location,
});

const mapDispatchToProps = {
  fetchDeliveryOrders: OrdersCreators.fetchDeliveryOrders,
  recoverRoute: RoutesCreators.recoverRoute,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrdersScreen);
