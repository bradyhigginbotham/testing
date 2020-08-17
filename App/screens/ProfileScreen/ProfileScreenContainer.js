import { connect } from 'react-redux';
import ProfileScreen from './ProfileScreen';
import EarningsCreators from '../../Redux/EarningsRedux';

const mapStateToProps = ({ users: { user }, earnings: { performance, performanceLoading} }) => ({
  user,
  performance,
  performanceLoading
});

const mapDispatchToProps = {
  getPerformance: EarningsCreators.getPerformance,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
