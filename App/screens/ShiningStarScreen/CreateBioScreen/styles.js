import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ApplicationStyles, Fonts } from '../../../Themes';
import colors from '../../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingBottom: hp('1%'),
    backgroundColor: colors.white,
    paddingLeft: hp('4%'),
    paddingRight: hp('4%'),
    paddingTop: hp('10%'),
  },
  innerContainer: {},
  title: {
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: hp(2),
    color: colors.navi,
    marginTop: hp(2),
  },
  textInputContainer: {
    padding: hp(2),
    borderColor: colors.whitish_grey,
    borderWidth: 1,
    borderRadius: hp(2),
    height: hp(15),
    marginTop: hp(4),
    width: wp(80),
  },
  profilePicture: {
    backgroundColor: colors.whitish_grey,
    height: wp(25),
    width: wp(25),
    borderRadius: wp(12.5),
  },
  charCount: {
    color: colors.whitish_grey,
    fontSize: hp(1.5),
    alignSelf: 'flex-end',
    marginTop: hp(1),
    marginRight: wp(5),
  },
  doneButtonContainer: {
    marginTop: hp(2),
    width: wp(80),
  },
});
