import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ApplicationStyles } from '../../Themes';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cardContainer: {
    paddingLeft: wp('3%'),
    paddingRight: wp('4%'),
    paddingVertical: hp('3%'),
    backgroundColor: colors.snow,
  },
  card: {
    elevation: 2,
    marginTop: hp('1.6%'),
  },
  leftSide: {
    justifyContent: 'space-between',
  },
  consumerName: {
    fontSize: hp('2%'),
    marginBottom: hp('0.3%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  pickedUp: {
    fontSize: hp('2%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Regular',
  },
  rightSide: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  dayExpected: {
    color: colors.navi,
    fontSize: hp('1.7%'),
    textTransform: 'uppercase',
    fontFamily: 'AvenirNext-DemiBold',
  },
  timeExpected: {
    fontSize: hp('2%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
});
