import { connect } from 'react-redux';
import AuthenticationCreators from '../../Redux/AuthenticationRedux';
import SkipOnboardingButton from './SkipOnboardingButton';

const mapStateToProps = (_, { navigation }) => ({
  navigation,
});

const mapDispatchToProps = {
  setFirstTime: AuthenticationCreators.setFirstTime,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkipOnboardingButton);
