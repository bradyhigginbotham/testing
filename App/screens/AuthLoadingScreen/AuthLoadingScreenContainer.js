import { connect } from 'react-redux';
import AuthLoadingScreen from './AuthLoadingScreen';

const mapStateToProps = ({ authentication: { firstTime } }) => ({
  firstTime,
});

export default connect(mapStateToProps)(AuthLoadingScreen);
