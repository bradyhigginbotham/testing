import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.snow,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp(8),
  },
  popupWrapper: {
    width: wp(84),
    height: hp(25),
    marginBottom: hp(10),
    marginTop: -hp(3),
    backgroundColor: colors.snow,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowColor: colors.coal,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 5,
  },
  mainContainer: {
    marginTop: wp(8),
    paddingBottom: wp(20),
  },
  row: {
    marginVertical: wp(3),
    marginHorizontal: wp(3)
  },
  primaryText: {
    color: colors.charcoal_grey,
    fontSize: hp(2.2),
    fontFamily: 'AvenirNext-Medium',
  },
  secondaryText: {
    color: colors.charcoal_grey,
    fontSize: hp(1.8),
    fontFamily: 'AvenirNext-Medium',
  },
});
