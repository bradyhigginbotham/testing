import { StyleSheet, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: `white`,
  },
  instructionsText: {
    color: colors.greyish_blue,
    marginTop: hp(4),
    marginHorizontal: wp(10),
    marginVertical: wp(5),
    textAlign: `center`,
    alignSelf: `center`,
  },
  verifyButtonContainer: {
    width: wp('75%'),
    marginTop: -hp(4),
    alignSelf: 'center',
    borderRadius: 50,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: `row`,
    marginHorizontal: wp(7.5),
    alignItems: `center`,
    marginTop: wp(7.5),
  },
  headerTitle: {
    fontFamily: 'AvenirNext-DemiBold',
    color: colors.ligh_navi,
    fontSize: hp(4),
    marginLeft: wp(4),
  },
  fieldsContainer: {
    marginTop: hp(3),
    marginLeft: wp(7.5),
    paddingLeft: 20,
    paddingVertical: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: colors.snow,
    shadowColor: `#000`,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    alignItems: `center`,
    paddingRight: wp(7.5)
  },
  fieldsTitle: {
    fontFamily: 'AvenirNext-Medium',
    color: colors.charcoal_grey,
    fontSize: hp(2.2),
    textAlign: `center`,
  },
  status: {
    marginTop: hp(3),
    fontFamily: 'AvenirNext-DemiBold',
    color: colors.charcoal_grey,
    fontSize: hp(2.2),
    textTransform: `uppercase`,
    marginBottom: hp(5)
  },
});
