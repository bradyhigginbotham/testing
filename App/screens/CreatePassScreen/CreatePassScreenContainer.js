import { connect } from 'react-redux';
import AuthenticationCreators from '../../Redux/AuthenticationRedux';
import CreatePassScreen from './CreatePassScreen';

const mapStateToProps = ({ authentication: { createPasswordError, createPasswordLoading } }) => ({
  createPasswordError,
  createPasswordLoading,
});

const mapDispatchToProps = {
  reset: AuthenticationCreators.reset,
  createPassword: AuthenticationCreators.createPassword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePassScreen);
