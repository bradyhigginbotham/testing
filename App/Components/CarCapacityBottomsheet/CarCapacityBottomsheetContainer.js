import { connect } from 'react-redux';
import CarCapacityBottomsheet from './CarCapacityBottomsheet';
import PreferencesCreators from '../../Redux/PreferencesRedux';

const mapStateToProps = ({ preferences: { carCapacity } }) => ({
  carCapacity,
});

const mapDispatchToProps = {
  setCapacity: PreferencesCreators.setCapacity,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarCapacityBottomsheet);
