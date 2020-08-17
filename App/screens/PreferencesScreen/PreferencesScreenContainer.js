import { connect } from 'react-redux';
import PreferencesScreen from './PreferencesScreen';

const mapStateToProps = ({ preferences: { carCapacity, defaultMapApp, radius } }) => ({
  carCapacity,
  defaultMapApp,
  radius,
});

export default connect(
  mapStateToProps,
  null
)(PreferencesScreen);
