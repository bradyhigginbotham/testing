import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ApplicationStyles} from '../../Themes';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scrollPicker: {
    marginVertical: 0,
  },
  bottomTitle: {
    color: colors.navi,
    textAlign: 'center',
    fontSize: hp('2.2%'),
    marginTop: hp('1.5%'),
    marginBottom: hp('1%'),
    letterSpacing: wp('0.1%'),
    fontFamily: 'AvenirNext-DemiBold',
  },
  bottomSubtitle: {
    fontSize: hp('2%'),
    color: colors.navi,
    textAlign: 'center',
    marginBottom: hp('2%'),
    marginHorizontal: wp('10%'),
    fontFamily: 'AvenirNext-Regular',
  },
  bottomsheetContentContainer: {
    marginBottom: Platform.OS === 'android' ? hp('12.5%') : hp('3%'),
    marginLeft: wp(6),
  },
  defaultMapOptionContainer: {
    marginTop: 0,
    paddingVertical: hp('3%'),
  },
  saveChangesText: {
    color: colors.navi,
    fontSize: hp('2%'),
    textAlign: 'center',
    fontFamily: 'AvenirNext-DemiBold',
  },
  discardChangesText: {
    fontSize: hp('2%'),
    textAlign: 'center',
    color: colors.greyish_blue,
    fontFamily: 'AvenirNext-Medium',
  },
  separator: {
    height: 1,
    marginHorizontal: wp('5%'),
    backgroundColor: colors.light_grey2,
  },
});
