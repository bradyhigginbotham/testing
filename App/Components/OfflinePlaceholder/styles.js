import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  disableOrdersScreenContainer: {
    flex: 1,
    paddingHorizontal: wp('9%'),
    paddingTop: hp('23%'),
    alignItems: 'center',
    backgroundColor: '#69bfb0',
  },
  disableOrdersScreenImage: {
    width: wp('23%'),
    resizeMode: 'contain',
  },
  disableOrdersScreenText: {
    color: colors.snow,
    fontSize: hp('2.3%'),
    textAlign: 'center',
    lineHeight: hp('3.2%'),
    paddingTop: hp('2%'),
  },
});
