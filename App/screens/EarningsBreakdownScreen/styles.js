import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: colors.snow,
  },
  separatorLine: {
    marginVertical: hp('0.2%'),
  },
  pendingContainer: {
    marginVertical: 0,
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    justifyContent: 'space-between',
    backgroundColor: colors.light_grey,
  },
  pendingTitle: {
    fontSize: hp('1.8%'),
    paddingHorizontal: 0,
    lineHeight: hp('2.2%'),
    color: colors.blue_grey,
    textTransform: 'uppercase',
  },
  orderPendingContainer: {
    paddingHorizontal: 0,
    paddingVertical: hp('2%'),
    marginHorizontal: wp('5%'),
  },
  orderPendingHamprs: {
    fontSize: hp('2.3%'),
    color: colors.blue_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  orderPendingHours: {
    fontSize: hp('2.0%'),
    textTransform: 'uppercase',
    color: 'rgba(13,14,16,.3)',
    fontFamily: 'AvenirNext-DemiBold',
  },
  orderImage: {
    width: 7,
    height: 12,
    marginTop: hp('1.4%'),
  },
  rightOrderContainer: {
    flexDirection: 'row',
  },
  orderHamprs: {
    fontSize: hp('2.3'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  orderTime: {
    fontSize: hp('2.0%'),
    color: colors.blue_grey,
    textTransform: 'uppercase',
    fontFamily: 'AvenirNext-DemiBold',
  },
  orderMoney: {
    fontSize: hp('2.4%'),
    marginRight: wp('3%'),
    fontFamily: 'AvenirNext-DemiBold',
  },
  itemContainer: {
    backgroundColor: colors.white,
  },
});
