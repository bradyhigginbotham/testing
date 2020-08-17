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
  },
  navigation: {
    flexDirection: 'column',
    paddingVertical: hp('3%'),
  },
  sectionTitle: {
    marginLeft: wp('4%'),
    fontSize: hp('1.8%'),
    textTransform: 'uppercase',
    color: colors.greyish_blue,
    marginBottom: hp(4),
  },
  bankAccountContainer: {
    flexDirection: 'row',
    padding: wp(4),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bankName: {
    fontSize: hp(2),
    color: colors.charcoal_grey,
  },
  accountEnding: {
    fontSize: hp(2),
    color: colors.blue_grey,
  },
  defaultIndicator: {
    fontSize: hp(1.6),
    textTransform: 'uppercase',
    color: colors.blue_grey,
    marginRight: wp(4),
  },
  separator: {
    height: 1,
    width: '92%',
    backgroundColor: colors.charcoal_grey,
    opacity: 0.25,
    marginLeft: wp(4),
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addContainer: {
    padding: hp(2),
  },
  add: {
    height: hp(3.5),
    width: hp(3.5),
  }
});
