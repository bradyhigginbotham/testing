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
    backgroundColor: colors.white,
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4.5%'),
    backgroundColor: colors.white,
  },
  orderExpectedContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: hp('2.4%'),
    borderColor: colors.light_grey,
  },
  clientExpected: {
    fontSize: hp(2),
    marginBottom: hp('1%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  dateExpected: {
    color: colors.navi,
    fontSize: hp('2.3%'),
    textTransform: 'uppercase',
    fontFamily: 'AvenirNext-Medium',
  },
  timeExpected: {
    fontSize: hp('2.3%'),
    color: colors.navi,
    fontFamily: 'AvenirNext-DemiBold',
  },
  separatorLine: {
    height: 2,
    width: wp('90%'),
    marginVertical: hp('3%'),
    backgroundColor: colors.light_grey,
  },
  instructionsContainer: {
    elevation: 2,
    width: wp('90%'),
    marginTop: hp('2%'),
    borderRadius: 25,
    flexDirection: 'column',
    backgroundColor: colors.snow,
  },
  instructionsHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
    backgroundColor: colors.light_grey,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: hp('2.3%'),
    color: colors.navi,
    fontFamily: 'AvenirNext-DemiBold',
  },
  scanText: {
    fontSize: hp('2.1%'),
    color: colors.navi,
    fontFamily: 'AvenirNext-DemiBold',
  },
  headerStatus: {
    fontSize: hp('1.8%'),
    textTransform: 'uppercase',
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  preferencesContainer: {
    marginTop: hp(1),
    paddingLeft: wp('6%'),
    paddingRight: wp('4%'),
  },
  preferenceTitle: {
    fontSize: hp('1.6%'),
    color: colors.greyish_blue,
    textTransform: 'uppercase',
    fontFamily: 'AvenirNext-DemiBold',
  },
  singlePreferenceContainer: {
    marginLeft: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('0.4%'),
  },
  preferenceSection: {
    marginTop: hp('2%'),
  },
  preferenceType: {
    fontSize: hp('2.0%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  preference: {
    fontSize: hp('2.0%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  washingConsumerNote: {
    fontSize: hp('1.9%'),
    marginHorizontal: wp('5%'),
    marginVertical: hp('0.6%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Italic',
  },
  consumerNote: {
    fontSize: hp('1.8%'),
    marginHorizontal: wp('6%'),
    marginVertical: hp('0.8%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Italic',
  },
  dateAndButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: wp('6%'),
    paddingRight: wp('3%'),
    justifyContent: 'space-between',
  },
  status: {
    fontSize: hp('1.9%'),
    marginVertical: hp('1.5%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Regular',
  },
  buttonContainer: {
    borderRadius: 50,
    backgroundColor: colors.snow,
    marginVertical: hp(2),
  },
  button: {
    borderWidth: 1,
    paddingHorizontal: wp('5%'),
    backgroundColor: colors.snow,
    borderColor: colors.greyish_blue,
    width: wp('35%'),
  },
  titleStyle: {
    color: colors.greyish_blue,
    textAlign: `center`,
  },
  disabled: {
    opacity: 0.5,
  },
  bottomSheetContainer: {
    width: wp('100%'),
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('6%'),
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
  imagesContainer: {
    flexDirection: 'row',
    marginTop: hp('2.8%'),
    marginBottom: hp('3%'),
    justifyContent: 'space-evenly',
  },
  imageAndTextContainer: {
    flexDirection: 'column',
  },
  contactSupport: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  defaultOption: {
    height: hp('10'),
    marginBottom: hp('2%'),
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
});
