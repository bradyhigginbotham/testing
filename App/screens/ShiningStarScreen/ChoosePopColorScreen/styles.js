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
    alignItems: 'center',
  },
  title: {
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: hp(2),
    color: colors.navi,
    marginTop: hp(2),
  },
  subtitle: {
    textAlign: 'center',
    marginTop: hp(2),
  },
  colorsContainer: {
    height: wp(80),
    width: wp(80),
    justifyContent: 'space-between',
    alignContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: wp(5),
    elevation: 2,
    shadowColor: colors.coal,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  popColorTouchable: {
    height: wp(35),
    width: wp(35),
    borderRadius: 15,
    elevation: 4,
  },
  popColorGradient: {
    height: wp(30),
    width: wp(30),
    borderRadius: 15,
    elevation: 4,
  },
  selectedPopColorTouchable: {
    borderWidth: 7,
    borderColor: colors.white,
    height: wp(30),
    width: wp(30),
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCheckmark: {
    height: wp(10),
    width: wp(10),
  },
  profilePicture: {
    backgroundColor: colors.whitish_grey,
    height: wp(25),
    width: wp(25),
    borderRadius: wp(12.5),
  },
  doneButtonContainer: {
    position: 'absolute',
    left: hp(5),
    right: hp(5),
    bottom: hp(4),
  },
});
