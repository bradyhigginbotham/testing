import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ApplicationStyles } from '../../Themes';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: hp('1%'),
    paddingBottom: hp('18%'),
    paddingHorizontal: wp('4.5%'),
    backgroundColor: colors.white,
  },
  orderExpectedContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: hp('3.4%'),
    borderColor: colors.light_grey,
  },
  clientExpected: {
    fontSize: hp('2.1%'),
    marginBottom: hp('1%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  dateExpected: {
    color: colors.navi,
    fontSize: hp('2.6%'),
    textTransform: 'uppercase',
    fontFamily: 'AvenirNext-Medium',
  },
  timeExpected: {
    fontSize: hp('2.6%'),
    color: colors.navi,
    fontFamily: 'AvenirNext-DemiBold',
  },
  addresContainer: {
    borderTopWidth: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: hp('3.4%'),
    borderColor: colors.light_grey,
    justifyContent: 'space-between',
  },
  addresImageContainer: {
    width: wp('20%'),
    height: hp('10.5%'),
    marginRight: wp('1.5%'),
  },
  addresImage: {
    width: wp('18%'),
    height: hp('10.5%'),
  },
  instructionsContainer: {
    borderBottomWidth: 1,
    paddingVertical: hp('3.4%'),
    borderColor: colors.light_grey,
  },
  instructions: {
    fontSize: hp('2.0%'),
    fontFamily: 'AvenirNext-Regular',
  },
  orderContainer: {
    paddingTop: hp('2.4%'),
  },
  title: {
    fontSize: hp('2.1%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  scanText: {
    fontSize: hp(`1.8%`),
    marginLeft: wp(1),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  addres: {
    fontSize: hp('2.1%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  startButtonContainer: {
    width: wp('85%'),
    alignSelf: 'center',
    bottom: hp('4%'),
    position: 'absolute',
  },
  surface: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    elevation: 2,
    borderRadius: 30,
    marginTop: hp('2%'),
    paddingVertical: hp('1.6%'),
    paddingHorizontal: wp('6%'),
  },
  orderItemContainer: {
    flexDirection: `row`,
    alignItems: `flex-end`,
    justifyContent: `flex-end`,
  },
  timelineContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: hp('1.2%'),
    justifyContent: 'space-between',
  },
  arrowImageContainer: {
    height: hp('3%'),
    marginRight: wp('2%'),
    justifyContent: 'center',
  },
  arrowImage: {
    height: hp('1%'),
    width: wp('3.4%'),
  },
  overflowButtonContainer: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: wp('1.6%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  overflowButton: {
    width: 6,
    height: 20,
  },
  bottomSheetContainer: {
    width: wp('100%'),
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('6%'),
  },
  imagesContainer: {
    flexDirection: 'row',
    marginTop: hp('2.8%'),
    marginBottom: hp('3%'),
    justifyContent: 'space-evenly',
  },
  imageAndTextContainer: {
    flexDirection: 'column',
  },
  locationImageContainer: {
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  bottomSheetImageContainer: {
    width: 50,
    height: 50,
    elevation: 2,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetImage: {
    height: 20,
  },
  imageText: {
    textAlign: 'center',
    marginVertical: 0,
    marginTop: hp('1%'),
    fontSize: hp('1.6%'),
    color: colors.greyish_blue,
    backgroundColor: 'transparent',
    fontFamily: 'AvenirNext-Medium',
  },
  bottomTitle: {
    textAlign: 'center',
    fontSize: hp('2.1%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  bottomSubtitle: {
    textAlign: 'center',
    fontSize: hp('2.3%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Regular',
  },
  contactSupport: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: colors.light_grey,
    borderBottomColor: colors.light_grey,
  },
  defaultOption: {
    height: hp('10'),
    marginBottom: hp('2%'),
    justifyContent: 'center',
  },
  picker: {
    color: colors.navi,
    textAlign: 'center',
    fontSize: hp('2.3%'),
    fontFamily: 'AvenirNext-DemiBold',
  },
  rejectOrderTitle: {
    textAlign: 'center',
    fontSize: hp('2.7%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  rejectOrderSubtitle: {
    textAlign: 'center',
    fontSize: hp('2.2%'),
    marginBottom: hp('3%'),
    color: colors.blue_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  rejectOrder: {
    marginBottom: hp('4%'),
  },
});
