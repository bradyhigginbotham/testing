import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ApplicationStyles } from '../../Themes';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flexGrow: 1,
    paddingLeft: wp('3%'),
    paddingBottom: hp('12.5%'),
    paddingTop: hp('1.5%'),
    backgroundColor: colors.white,
  },
  startButtonContainer: {
    width: wp('85%'),
    alignSelf: 'center',
    bottom: hp('2.5%'),
    position: 'absolute',
    borderRadius: 50,
  },
  emptyState: {
    top: `30%`,
    width: `100%`,
    padding: hp('10%'),
    textAlign: `center`,
    position: `absolute`,
    color: colors.blue_grey,
  },
  loading: { height: `100%`, backgroundColor: colors.white },
  fabSurface: {
    right: 16,
    bottom: 16,
    elevation: 6,
    borderRadius: 50,
    position: 'absolute',
  },
  ripple: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
  fabContainer: {
    width: 64,
    height: 64,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.snow,
  },
  fabIcon: {
    height: 24,
    width: 24,
  },
  fabText: {
    fontSize: hp('1.5%'),
    color: colors.greyish_blue,
    textTransform: 'uppercase',
    fontFamily: 'AvenirNext-Medium',
  },
});
