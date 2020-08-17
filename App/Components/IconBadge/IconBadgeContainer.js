import { connect } from 'react-redux';
import IconBadge from './IconBadge';

const mapStateToProps = ({ orders: { deliveryOrdersList } }) => ({
  deliveryOrders: deliveryOrdersList.length,
});

export default connect(
  mapStateToProps,
  null
)(IconBadge);
