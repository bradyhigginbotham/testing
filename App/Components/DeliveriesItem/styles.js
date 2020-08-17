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
    paddingVertical: hp('2%'),
    backgroundColor: colors.snow,
  },
  cardBackgroundItem: {
    backgroundColor: colors.blush,
  },
  card: {
    elevation: 2,
    marginTop: hp('1%'),
  },
  leftSide: {
    justifyContent: 'space-between',
    flex: 0.6,
  },
  rightSide: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 0.4,
  },
  name: {
    fontSize: hp('1.8%'),
    color: colors.blue_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  adress: {
    fontSize: hp('1.8%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  pickUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickUpImage: {
    width: 9,
    height: 9,
    marginRight: wp('2%'),
    marginTop: -1 * hp('0.2%'),
  },
  pickUpText: {
    fontSize: hp('1.5%'),
    color: colors.blue_grey,
    textTransform: 'uppercase',
    fontFamily: 'AvenirNext-DemiBold',
  },
  time: {
    fontSize: hp('1.8%'),
    marginVertical: hp('0.5%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  hamprs: {
    fontSize: hp('1.9%'),
    color: colors.blue_grey,
    fontFamily: 'AvenirNext-Medium',
  },
});
