import { StyleSheet, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ApplicationStyles } from '../../Themes';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scrollPicker: {
    marginVertical: 0,
  },
  bottomTitle: {
    textAlign: 'center',
    fontSize: hp('2.2%'),
    marginTop: hp('1.5%'),
    marginBottom: hp('1%'),
    letterSpacing: wp('0.1%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  bottomSubtitle: {
    fontSize: hp('2%'),
    textAlign: 'center',
    color: colors.blue_grey,
    marginHorizontal: wp('10%'),
    marginBottom: hp('2%'),
    fontFamily: 'AvenirNext-Medium',
  },
  bottomsheetContentContainer: {
    marginBottom: Platform.OS === 'android' ? hp('7.5%') : hp('3%'),
  },
  defaultMapOptionContainer: {
    marginTop: 0,
    paddingVertical: hp('3%'),
  },
  text: {
    color: colors.navi,
    fontSize: hp('2%'),
    textAlign: 'center',
    fontFamily: 'AvenirNext-DemiBold',
  },
});
