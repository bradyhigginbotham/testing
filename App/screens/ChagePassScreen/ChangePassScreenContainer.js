import {connect} from 'react-redux';
import AuthenticationCreators from '../../Redux/AuthenticationRedux';
import ChangePassScreen from './ChangePassScreen';

const mapStateToProps = ({authentication: {changePasswordLoading, changePasswordError}}) => ({
  changePasswordLoading,
  changePasswordError,
});

const mapDispatchToProps = {
  changePassword: AuthenticationCreators.changePassword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassScreen);
