import { StyleSheet, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  ripple: {
    borderRadius: 50,
    marginBottom: hp('0.8%'),
  },
  timeoutButtonContainer: {
    height: hp('5.5%'),
    width: wp('23%'),
    borderRadius: 50,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pale_teal,
  },
  timeoutButtonTitleStyle: {
    color: colors.white,
    fontSize: hp('1.9%'),
  },
  timeOutLayer: {
    left: 0,
    height: hp('5.5%'),
    position: 'absolute',
    backgroundColor: colors.dark_pale_teal,
  },
  buttonContainer: {
    height: hp('5.5%'),
    marginBottom: hp('0.8%'),
    width: wp('23%'),
    borderRadius: 50,
    backgroundColor: colors.snow,
  },
  button: {
    backgroundColor: colors.snow,
    borderColor: colors.greyish_blue,
    height: hp('5.5%'),
    borderWidth: 1,
  },
  titleStyle: {
    color: colors.greyish_blue,
  },
  scrollPicker: {
    marginVertical: 0,
  },

  startButtonContainer: {
    width: wp('85%'),
    bottom: hp('2.5%'),
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 50,
  },
  bottomTitle: {
    fontSize: hp('2.0%'),
    textAlign: 'center',
    marginTop: hp('1.5%'),
    marginBottom: hp('1%'),
    letterSpacing: wp('0.1%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  bottomSubtitle: {
    fontSize: hp('1.8%'),
    textAlign: 'center',
    color: colors.blue_grey,
    marginHorizontal: wp('10%'),
    marginBottom: hp('2%'),
    fontFamily: 'AvenirNext-Medium',
  },
  contentContainer: {
    paddingBottom: hp('1.6%'),
  },
  bottomsheetContentContainer: {
    marginBottom: Platform.OS === 'android' ? hp('6%') : hp('3%'),
  },
  doneButtonContainer: {
    width: wp('85%'),
    alignSelf: 'center',
    marginTop: hp('3%'),
    borderRadius: 50,
  },
  loading: { height: `100%`, backgroundColor: colors.white },
  emptyState: {
    top: `30%`,
    width: `100%`,
    padding: hp('10%'),
    textAlign: `center`,
    position: `absolute`,
    color: colors.blue_grey,
  },

  completeProfileContainer: {
    backgroundColor: colors.pastel_red,
    margin: wp(3),
    paddingVertical: wp(5),
    paddingRight: wp(3),
    borderRadius: 16,
    shadowColor: colors.coal,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  completeProfileText: {
    color: colors.white,
    marginLeft: wp(3),
  },
  completeProfileClose: {
    height: hp(2),
    width: hp(2),
    margin: 1,
  }
});
