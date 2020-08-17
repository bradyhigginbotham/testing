import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    width: wp('90%'),
    paddingVertical: wp('4%'),
    paddingHorizontal: wp('8%'),
    borderRadius: hp('15%'),
    backgroundColor: colors.white,
    elevation: 3,
    justifyContent: 'center',
  },
  title: {
    color: colors.dark_blue,
    textAlign: 'center',
  },
});
