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
    width: wp('85%'),
    marginTop: hp(8),
    alignSelf: 'center',
    borderRadius: 50,
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
    marginHorizontal: wp(7.5),
  },
  fieldsTitle: {
    fontFamily: 'AvenirNext-Medium',
    color: colors.charcoal_grey,
    fontSize: hp(2.2),
  },
  firstField: {
    fontFamily: 'AvenirNext-Medium',
    color: colors.charcoal_grey,
    fontSize: hp(1.8),
    marginTop: hp(2),
    marginLeft: wp(2),
  },
  otherFields: {
    fontFamily: 'AvenirNext-Medium',
    color: colors.charcoal_grey,
    fontSize: hp(1.8),
    marginLeft: wp(2),
    marginTop: hp(1),
  },
  lastField: {
    fontFamily: 'AvenirNext-Medium',
    color: colors.charcoal_grey,
    fontSize: hp(1.8),
    marginLeft: wp(2),
    marginTop: hp(1),
    marginBottom: hp(4),
  },
  uploadIdButton: {
    paddingHorizontal: 15,
    borderRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: colors.snow,
    shadowColor: `#000`,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    height: hp(6),
    marginTop: hp(2),
    marginHorizontal: wp(12),
    alignItems: `center`,
    justifyContent: `center`,
  },
  uploadIdButtonSelected: {
    borderColor: colors.pale_teal,
    borderWidth: 1,
  },
  photoIdImage: {
    height: hp(4),
    width: hp(4),
    resizeMode: `contain`,
    opacity: 0.2,
  },
  uploadIDText: {
    marginLeft: wp(2),
    color: colors.grey,
  },
  IDButtonContent: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    width: `100%`,
  },
  IDButtonLeft: {
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
  },
  IDButtonRight: {
    height: hp(3),
    width: hp(3),
    resizeMode: `contain`,
  },
  tosContainer: {
    marginHorizontal: wp(7.5),
    marginTop: hp(4),
    flexDirection: `row`,
    alignItems: `center`,
    alignSelf: `center`,
  },
  tosText: {
    fontSize: hp(1.5)
  },
  checkboxContainer: {
    padding: hp(1.5),
  },
  checkboxBorder: {
    borderRadius: 6,
    borderColor: colors.grey,
    borderWidth: 2,
    height: hp(2.5),
    width: hp(2.5),
  },
  checkboxSelected: {
    borderRadius: 4,
    margin: 1,
    flex: 1,
    backgroundColor: colors.pale_teal,
  },
  tosLink: {
    textDecorationLine: `underline`
  },
});
