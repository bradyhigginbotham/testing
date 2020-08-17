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
  twinButtonContainer: {
    width: wp('40%'),
    alignSelf: 'center',
    borderRadius: 50,
    marginHorizontal: wp(2),
  },
  twinButtonsFooter: {
    position: 'absolute',
    flexDirection: `row`,
    justifyContent: `center`,
    bottom: hp(1),
    width: wp(100),
    height: hp(10),
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
});
