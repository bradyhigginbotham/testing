import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.snow,
    paddingVertical: hp('1.5%'),
  },
  personalData: {
    marginLeft: wp('4%'),
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: wp('3%'),
    paddingVertical: hp('1.5%'),
    justifyContent: 'space-between',
  },
  imageAndContactContainer: {
    flexDirection: 'row',
  },
  stripeButton: {
    width: wp('60%'),
    height: hp('6%'),
    marginTop: hp(1),
    marginBottom: hp(2),
    alignSelf: 'center',
    borderRadius: hp(10),
    backgroundColor: colors.navi,
    justifyContent: `center`,
  },
  stripeTitle: {
    color: colors.white,
    fontSize: hp('1.9%'),
    fontFamily: 'AvenirNext-DemiBold',
    alignSelf: 'center',
  },
  stripeButtonInternal: {
    borderRadius: hp(10),
  },
  separatorLine: {
    height: 0.5,
    marginVertical: 1,
    backgroundColor: colors.charcoal_grey,
    marginHorizontal: wp('4%'),
  },
  avatarContainer: {
    height: wp('20%'),
    width: wp('20%'),
    marginRight: wp('4%'),
    backgroundColor: colors.white,
    borderRadius: hp(10),
    shadowColor: colors.coal,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: colors.light_grey,
    borderRadius: hp(10),
    height: wp(18),
    width: wp(18),
  },
  contact: {
    marginRight: 15,
    alignSelf: 'center',
    flexDirection: 'column',
    flex: 10,
  },
  name: {
    fontSize: hp('2.3%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  mail: {
    fontSize: hp('2.1%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Regular',
  },
  number: {
    fontSize: hp('2.1%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Regular',
  },
  editInformationButton: {
    flex: 1,
    alignItems: 'flex-end',
    alignSelf: 'center',
    marginRight: wp('5%'),
  },
  editInformation: {
    width: 23,
    height: 23,
  },
  performanceLoading: {
    alignSelf: `center`,
    marginTop: hp(2.4),
    marginBottom: hp(2.4),
  },
  performanceContainer: {
    marginHorizontal: wp('4%'),
    flexDirection: 'column',
    paddingVertical: hp('2%'),
  },
  showPerformance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  performanceTitle: {
    color: colors.greyish_blue,
    fontSize: hp('1.8%'),
    textTransform: 'uppercase',
  },
  arrowImageContainer: {
    height: hp('3%'),
    flexDirection: 'row',
    marginRight: wp('2%'),
    alignItems: 'center',
  },
  weeklyText: {
    color: colors.greyish_blue,
    fontSize: hp('2.0%'),
    marginRight: wp('1.5%'),
  },
  arrowImage: {
    width: 12,
    height: 7,
  },
  surfaceContainer: {
    flexDirection: 'row',
    paddingVertical: hp('3%'),
    justifyContent: 'space-between',
  },
  surface: {
    elevation: 3,
    borderRadius: 10,
    width: wp('44%'),
    marginHorizontal: 2,
    paddingVertical: hp('2.5%'),
    paddingHorizontal: wp('5%'),
  },
  earnings: {
    fontSize: hp('1.6%'),
    textTransform: 'uppercase',
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  money: {
    fontSize: hp('4.3%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  currentWeek: {
    fontSize: hp('1.9%'),
    color: colors.blue_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  ordersPerHour: {
    fontSize: hp('1.6%'),
    textTransform: 'uppercase',
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  orders: {
    color: colors.dark,
    fontSize: hp('4.3%'),
    fontFamily: 'AvenirNext-Medium',
  },
  progressContainer: {
    marginVertical: hp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressWithText: {
    height: hp('8%'),
    width: wp('46%'),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textContainer: {
    marginLeft: wp('3%'),
    flexDirection: 'column',
  },
  text: {
    fontSize: hp('1.7%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Regular',
  },
  percent: {
    fontSize: hp('2.6%'),
    color: colors.dark_blue2,
    fontFamily: 'AvenirNext-DemiBold',
  },
  ratingContainer: {
    marginVertical: hp('2.8%'),
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingNumber: {
    fontSize: hp('2.1%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  ratingText: {
    fontSize: hp('1.8'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Regular',
  },
  rates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  starImage: {
    marginLeft: wp('2%'),
    width: 16,
    height: 15,
  },
  myAccountContainer: {
    flexDirection: 'column',
    paddingVertical: hp('3%'),
  },
  myAccountOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ripple: {
    paddingVertical: hp('1%'),
    marginTop: hp('1%'),
    paddingLeft: wp('7%'),
    paddingRight: wp('4%'),
  },
  myAccountAndMoreTitle: {
    marginLeft: wp('4%'),
    color: colors.greyish_blue,
    fontSize: hp('1.8%'),
    textTransform: 'uppercase',
  },
  myAccountOptionIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountOptionLeftIcon: {
    height: 25,
    width: 32,
    marginRight: wp('3.5%'),
  },
  myAccountOptionText: {
    fontSize: hp('2.3%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  accountOptionRightIcon: {
    width: 7,
    height: 12,
  },
  orderDroppsContainer: {
    paddingLeft: wp('6%'),
  },
  droppsImage: {
    height: 28,
    width: 41,
    marginRight: wp('2%'),
  },
  moreContainer: {
    flexDirection: 'column',
    paddingVertical: hp('3%'),
  },
  options: {
    flex: 1,
  },
  logout: {
    paddingLeft: wp('7%'),
  },
  logoutText: {
    marginLeft: wp('20%'),
    fontSize: hp('2.3%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  bottomRights: {
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: hp('6%'),
  },
  washrByHampr: {
    fontSize: hp('2.4%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  rights: {
    fontSize: hp('1.9%'),
    color: colors.blue_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  version: {
    fontSize: hp('1.8%'),
    color: colors.blue_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  moreOptionText: {
    marginLeft: wp('6%'),
    fontSize: hp('2.3%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },

  //
  // Profile preview
  //

  washrProfileGradient: {
    height: hp(15),
    width: wp(100),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  washrProfileHeaderContainer: {
    marginTop: hp(-8),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: colors.coal,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 2,
  },
  washrProfileRatingContainer: {
    height: hp(3),
    width: wp(14),
    borderRadius: hp(1.5),
    marginRight: wp(10),
    backgroundColor: colors.white,
    alignItems: 'center',
    opacity: 0,
  },
  washrProfileRating: {
    color: colors.ligh_navi,
    fontSize: hp(2),
  },
  washrProfileCertifiedContainer: {
    height: hp(3),
    width: wp(6),
    borderRadius: hp(1.5),
    marginLeft: wp(10),
    marginRight: wp(8),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  washrProfileCertified: {
    height: hp(2),
    width: hp(2),
    resizeMode: 'contain',
  },
  washrProfileAvatarContainer: {
    borderColor: colors.white,
    borderWidth: wp(1),
    borderRadius: hp(15),
    height: wp(30),
    width: wp(30),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  washrProfileAvatar: {
    height: wp(26),
    width: wp(26),
    backgroundColor: colors.light_grey,
    borderRadius: hp(13),
  },
  washrProfileMeet: {
    color: colors.ligh_navi,
    fontSize: hp(3.5),
    marginTop: hp(2),
    fontFamily: 'AvenirNext-DemiBold',
  },
  bioContainer: {
    width: wp(75),
    marginTop: hp(2),
  },
  washrProfileAboutMe: {
    textTransform: 'uppercase',
    color: colors.blue_grey,
    fontSize: hp(1.5),
    fontFamily: 'AvenirNext-DemiBold',
  },
  washrProfileBio: {
    color: colors.charcoal_grey,
    fontSize: hp(2),
    marginTop: hp(1),
  },
  washrProfileSeparator: {
    height: 1,
    width: wp(75),
    backgroundColor: colors.whitish_grey,
    marginTop: hp(2.5),
    marginBottom: hp(2.5),
  },
  washrProfileRate: {
    color: colors.charcoal_grey,
  },
  washrProfileClose: {
    color: colors.blue_grey,
    marginTop: hp(6),
    marginBottom: hp(6),
  },
  washrProfileRatingStars: {
    width: wp(60),
    height: wp(10),
    resizeMode: 'contain',
    marginVertical: hp(2),
  },

  //
  // ProfileCompletion View
  //

  profileCompleteContainer: {
    padding: wp(4),
  },
  profileCompleteTitle: {
    color: colors.ligh_navi,
    fontFamily: 'AvenirNext-DemiBold',
  },
  profileCompleteMoreStepsContainer: {
    backgroundColor: colors.pastel_red,
    borderRadius: hp(3),
    padding: wp(0.25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCompleteMoreSteps: {
    fontSize: hp(1.5),
    marginHorizontal: hp(1),
    textTransform: 'uppercase',
    fontFamily: 'AvenirNext-DemiBold',
    color: colors.white,
  },
  profileCompleteText: {
    color: colors.charcoal_grey,
    marginRight: wp(20),
    marginTop: hp(2),
  },
  profileCompleteSectionFilled: {
    width: wp(16),
    height: wp(12),
    borderRadius: wp(2),
    borderColor: colors.greyish_blue,
    backgroundColor: colors.blue_grey,
    borderWidth: 1,
    marginTop: hp(2),
    marginRight: wp(3),
  },
  profileCompleteSectionEmpty: {
    width: wp(16),
    height: wp(12),
    borderRadius: wp(2),
    borderColor: colors.greyish_blue,
    backgroundColor: colors.whitish_grey,
    borderWidth: 1,
    marginTop: hp(2),
    marginRight: wp(3),
  }
});
