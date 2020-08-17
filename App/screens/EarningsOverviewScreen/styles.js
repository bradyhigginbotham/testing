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
    marginBottom: hp('1%'),
    paddingBottom: hp('4%'),
    backgroundColor: colors.snow,
    paddingHorizontal: wp('3.5%'),
  },
  itemContainer: {
    elevation: 2,
    borderWidth: 1,
    borderRadius: 16,
    marginTop: hp('2%'),
    flexDirection: 'row',
    borderColor: colors.grey,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: hp('2.0%'),
    color: colors.blue_grey,
    textTransform: 'uppercase',
    fontFamily: 'AvenirNext-DemiBold',
  },
  money: {
    fontSize: hp('3.3%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
});
