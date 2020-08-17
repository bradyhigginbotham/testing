import { connect } from 'react-redux';
import StartupCreators from '../../Redux/StartupRedux';
import TimeoutButton from './TimeoutButton';

const mapStateToProps = ({ startup: { firstOrder } }) => ({
  firstOrder,
});

const mapDispatchToProps = {
  setFirstOrder: StartupCreators.setFirstOrder,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeoutButton);
