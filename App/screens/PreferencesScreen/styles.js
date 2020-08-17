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
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separatorLine: {
    height: 0.5,
    marginVertical: 1,
    backgroundColor: colors.charcoal_grey,
    marginHorizontal: wp('4%'),
  },
  navigation: {
    flexDirection: 'column',
    paddingVertical: hp('3%'),
  },
  orders: {
    marginVertical: hp('1.8%'),
    flexDirection: 'column',
  },
  sectionTitle: {
    marginLeft: wp('4%'),
    fontSize: hp('1.8%'),
    textTransform: 'uppercase',
    color: colors.greyish_blue,
  },
  leftText: {
    fontSize: hp('2.3%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  rightText: {
    fontSize: hp('2.3%'),
    color: colors.blue_grey,
    fontFamily: 'AvenirNext-Medium',
  },
});
