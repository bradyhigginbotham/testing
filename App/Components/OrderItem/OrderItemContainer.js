import { connect } from 'react-redux';
import PreferencesCreators from '../../Redux/PreferencesRedux';
import OrderItem from './OrderItem';

const mapStateToProps = ({ preferences: { carCapacity }, location: { location } }) => ({
  carCapacity,
  userLocation: location,
});

const mapDispatchToProps = {
  setCapacity: PreferencesCreators.setCapacity,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderItem);
