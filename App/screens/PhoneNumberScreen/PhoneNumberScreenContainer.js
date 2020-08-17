import {connect} from 'react-redux';
import AuthenticationCreators from '../../Redux/AuthenticationRedux';
import PhoneNumberScreen from './PhoneNumberScreen';

const mapStateToProps = ({authentication: {userPhoneNumber}}) => ({
  userPhoneNumber,
});

const mapDispatchToProps = {
  setUserPhoneNumber: AuthenticationCreators.setUserPhoneNumber,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneNumberScreen);
