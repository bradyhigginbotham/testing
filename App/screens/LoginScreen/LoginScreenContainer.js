import { connect } from 'react-redux';
import AuthenticationCreators from '../../Redux/AuthenticationRedux';
import LoginScreen from './LoginScreen';

const mapStateToProps = ({
  authentication: { signinLoading, signinError, lastUsedEmail },
}) => ({
  signinLoading,
  signinError,
  lastUsedEmail,
});

const mapDispatchToProps = {
  reset: AuthenticationCreators.reset,
  signin: AuthenticationCreators.signin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
