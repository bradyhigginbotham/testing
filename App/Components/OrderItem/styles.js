import { StyleSheet, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ApplicationStyles } from '../../Themes';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  card: {
    elevation: 3,
    marginTop: hp('1.6%'),
    marginLeft: wp('3%'),
  },
  cardContainer: {
    paddingVertical: hp('1.9%'),
  },
  leftSide: {
    justifyContent: 'space-between',
  },
  rightSide: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: hp('1.4%'),
    color: colors.blue_grey,
    fontFamily: 'AvenirNext-DemiBold',
    textTransform: `uppercase`,
  },
  time: {
    fontSize: hp('1.9%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  distance: {
    fontSize: hp('1.9%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  hamprs: {
    fontSize: hp('1.9%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  scrollPicker: {
    marginVertical: 0,
  },
  bottomTitle: {
    textAlign: 'center',
    fontSize: hp('2.0%'),
    marginTop: hp('1.5%'),
    marginBottom: hp('1%'),
    letterSpacing: wp('0.1%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  bottomSubtitle: {
    fontSize: hp('1.8%'),
    textAlign: 'center',
    color: colors.blue_grey,
    marginHorizontal: wp('10%'),
    marginBottom: hp('2%'),
    fontFamily: 'AvenirNext-Medium',
  },
  bottomsheetContentContainer: {
    marginBottom: Platform.OS === 'android' ? hp('6%') : hp('3%'),
  },
  doneButtonContainer: {
    width: wp('85%'),
    alignSelf: 'center',
    marginTop: hp('3%'),
    borderRadius: 50,
  },
});
