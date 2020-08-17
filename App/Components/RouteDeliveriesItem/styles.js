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
  },
  deliveryItemContainer: {
    marginBottom: 8,
    width: wp(85),
  },
  routeGraphicContainer: {
    alignItems: `center`,
    justifyContent: `center`,
    height: hp(16),
  },
  checkboxBorder: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    zIndex: 100,
    borderWidth: 2,
    backgroundColor: colors.white,
    marginHorizontal: wp(4.5),
    alignItems: `center`,
    justifyContent: `center`,
  },
  checkboxBorderGray: {
    borderColor: colors.grey,
  },
  grayBackground: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    backgroundColor: colors.grey,
  },
  lineGray: {
    width: wp(2),
    height: `50%`,
    backgroundColor: colors.grey,
    position: `absolute`,
  },
  checkboxBorderOrange: {
    borderColor: colors.blush,
  },
  orangeBackground: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    backgroundColor: colors.blush,
  },
  checkboxBorderBlue: {
    borderColor: colors.pale_teal,
  },
  blueBackground: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    backgroundColor: colors.pale_teal,
  },
  lineOrange: {
    width: wp(2),
    height: `50%`,
    backgroundColor: colors.blush,
    position: `absolute`,
  },
  lineBlue: {
    width: wp(2),
    height: `50%`,
    backgroundColor: colors.pale_teal,
    position: `absolute`,
  },
  rippleButton: {
    width: `100%`,
    height: `100%`,
    position: `absolute`,
  },
});
