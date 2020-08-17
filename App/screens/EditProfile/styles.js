import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(5),
    paddingHorizontal: wp(5),
    backgroundColor: colors.white,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  avatar: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  editProfilePhotoTouchable: {
    marginTop: hp(2.4),
    marginBottom: hp(3),
    alignSelf: 'center',
  },
  editProfilePhotoText: {
    fontSize: hp(2.1),
    color: colors.blue_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  changePassContainer: {
    marginBottom: hp(19),
    marginTop: hp(1.5),
  },
  changePassTouchable: {
    alignSelf: 'flex-start',
  },
  changePassText: {
    fontSize: hp(1.8),
    color: colors.greyish_blue,
    fontFamily: 'AvenirNext-Medium',
  },
  button: {
    width: wp('85%'),
    alignSelf: 'center',
    bottom: hp('2.5%'),
    position: 'absolute',
    borderRadius: 50,
  },
  closeButtonContainer: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    width: 20,
    height: 20,
  },

  washrProfileGradient: {
    height: hp(15),
    width: wp(100),
    marginTop: hp(-5),
    marginHorizontal: wp(-5),
  },
  washrProfileHeaderContainer: {
    marginTop: hp(-8),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: colors.coal,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 2,
  },
  washrProfileAvatarContainer: {
    borderColor: colors.white,
    borderWidth: wp(1),
    borderRadius: hp(15),
    height: wp(25),
    width: wp(25),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  washrProfileAvatar: {
    height: wp(22),
    width: wp(22),
    backgroundColor: colors.light_grey,
    borderRadius: hp(13),
  },
  editProfilePhoto: {
    alignSelf: 'center',
    color: colors.greyish_blue,
    fontFamily: 'AvenirNext-DemiBold',
    marginTop: hp(1),
  },
  editPopColorsContainer: {
    width: wp(10),
    height: wp(10),
    marginBottom: hp(2),
  },
  editPopColors: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain',
  },

  popColorsBottomSheetContainer: {
    alignItems: 'center',
    width: wp(100),
  },
  popColorSubtitle: {
    textAlign: 'center',
    marginTop: hp(4),
    fontFamily: 'AvenirNext-DemiBold',
    color: colors.charcoal_grey,
    marginHorizontal: wp(15),
  },
  popColorsContainer: {
    height: wp(80),
    width: wp(80),
    paddingLeft: wp(5),
    paddingVertical: wp(5),
    justifyContent: 'space-between',
    alignContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    elevation: 2,
    shadowColor: colors.coal,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  popColorTouchable: {
    height: wp(35),
    width: wp(35),
    borderRadius: 15,
  },
  popColorGradient: {
    height: wp(30),
    width: wp(30),
    borderRadius: 15,
  },
  selectedPopColorTouchable: {
    borderWidth: 7,
    borderColor: colors.white,
    height: wp(30),
    width: wp(30),
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCheckmark: {
    height: wp(10),
    width: wp(10),
  },
  doneButtonContainer: {
    width: wp(80),
    marginBottom: hp(3),
  },
  bioLength: {
    alignSelf: "flex-end",
    marginTop: hp(-2),
    marginBottom: hp(2),
    fontSize: hp(1.5),
    color: colors.blue_grey
  }
});
