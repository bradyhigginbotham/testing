import { connect } from 'react-redux';
import DefaultMapBottomsheet from './DefaultMapBottomsheet';
import PreferencesCreators from '../../Redux/PreferencesRedux';

const mapStateToProps = ({ preferences: { defaultMapApp } }) => ({
  defaultMapApp,
});

const mapDispatchToProps = {
  setDefaultMapApp: PreferencesCreators.setDefaultMapApp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultMapBottomsheet);
