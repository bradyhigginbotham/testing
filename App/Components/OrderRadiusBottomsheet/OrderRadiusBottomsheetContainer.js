import { connect } from 'react-redux';
import OrderRadiusBottomsheet from './OrderRadiusBottomsheet';
import PreferencesCreators from '../../Redux/PreferencesRedux';

const mapDispatchToProps = {
  setRadius: PreferencesCreators.setRadius,
};

export default connect(
  null,
  mapDispatchToProps
)(OrderRadiusBottomsheet);
