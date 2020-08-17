import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  card: {
    elevation: 2,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  backgroundItem: {
    backgroundColor: colors.pale_teal,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  rippleContainer: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: colors.grey_white,
  },
  ripple: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  content: {
    flexDirection: 'row',
    paddingRight: wp('3%'),
    paddingLeft: wp('4%'),
    paddingVertical: hp('2.5%'),
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'space-between',
  },
});
