import { StyleSheet, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    flexDirection: `row`,
    alignItems: `center`,
    paddingBottom: hp(1),
  },
  deliveryItemContainer: {
    marginBottom: 8,
    flex: 1,
  },
  checkboxBorder: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    borderColor: colors.grey,
    borderWidth: 1,
    backgroundColor: colors.white,
    marginHorizontal: wp(4.5),
    alignItems: `center`,
    justifyContent: `center`,
  },
  checkboxSelected: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    backgroundColor: colors.grey,
  },
  rippleButton: {
    width: `100%`,
    height: `100%`,
    position: `absolute`,
  }
});
