import { StyleSheet, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    backgroundColor: `white`,
    flex: 1,
    paddingHorizontal: wp(4),
    paddingBottom: Platform.OS === 'android' ? hp(15) : 0,
  },
  graphics: {
    alignSelf: `center`,
    marginTop: hp(2),
  },
  instructionsText: {
    color: colors.charcoal_grey,
    marginHorizontal: wp(4),
    marginVertical: wp(5),
    textAlign: `center`,
    alignSelf: `center`,
  },
  verifyButtonContainer: {
    width: wp('85%'),
    alignSelf: 'center',
    borderRadius: 50,
    position: `absolute`,
    bottom: hp('2.5%'),
  },
  input: {
    height: hp('9%'),
  },
  inputWrapper: { flexDirection: `row` },
  inputContainer: {
    flex: 1,
  },
  information: {
    height: hp(9),
    width: hp(4),
    zIndex: -999,
    alignSelf: `center`,
    justifyContent: `center`,
    alignItems: `flex-end`,
  },
  bottomSheetContainer: {
    margin: wp(5),
    alignItems: `center`,
  },
  bottomSheetImage: {
    flex: 1,
    width: wp(90),
    height: wp(42),
    resizeMode: `contain`,
  },
  bottomSheetTitle: {
    color: colors.charcoal_grey,
    marginTop: hp(2),
    fontSize: hp(2.5),
    fontFamily: 'AvenirNext-DemiBold',
  },
  bottomSheetText: {
    color: colors.charcoal_grey,
    marginTop: hp(2),
    fontSize: hp(2),
    marginHorizontal: wp(3),
    fontFamily: 'AvenirNext-Medium',
    textAlign: `center`,
  },
  bottomSheetOptionContainer: {
    height: hp(7),
    width: wp(80),
    borderRadius: hp(3.5),
    marginBottom: hp('2%'),
    justifyContent: 'center',
    backgroundColor: colors.navi,
    marginTop: hp(3),
    alignItems: `center`,
  },
  bottomSheetOptionText: {
    fontSize: hp(2),
    fontFamily: 'AvenirNext-DemiBold',
    color: colors.snow,
  },
});
