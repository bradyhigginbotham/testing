import { connect } from 'react-redux';
import AuthenticationCreators from '../../Redux/AuthenticationRedux';
import CarouselScreen from './CarouselScreen';

const mapDispatchToProps = {
  setFirstTime: AuthenticationCreators.setFirstTime,
};

export default connect(
  null,
  mapDispatchToProps
)(CarouselScreen);
