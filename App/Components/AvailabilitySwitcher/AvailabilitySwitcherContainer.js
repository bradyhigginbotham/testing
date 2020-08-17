import { connect } from 'react-redux';
import OrdersCreators from '../../Redux/OrdersRedux';
import AvailabilitySwitcher from './AvailabilitySwitcher';

const mapStateToProps = ({ orders: { available } }) => ({
  available,
});

const mapDispatchToProps = {
  setAvailability: OrdersCreators.setAvailability,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailabilitySwitcher);
