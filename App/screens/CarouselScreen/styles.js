import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ApplicationStyles } from '../../Themes';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: hp('2%'),
    justifyContent: 'space-between',
  },
  carouselContainer: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
    backgroundColor: colors.white,
  },
  title: {
    color: colors.navi,
    fontSize: hp('3%'),
    textAlign: 'center',
    lineHeight: hp('5%'),
    marginBottom: hp('7%'),
  },
  Image: {
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
    lineHeight: hp('3%'),
    marginVertical: hp('2%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
  button: {
    marginTop: 'auto',
    marginHorizontal: wp('8%'),
    marginBottom: hp('3%'),
  },
  dotStyle: {
    width: wp('1.7%'),
    height: wp('1.7%'),
    borderRadius: wp('0.8%'),
    backgroundColor: colors.blue_grey,
  },
  dotContainer: {
    paddingVertical: hp('3%'),
  },
  inactiveDotStyle: {
    borderWidth: 1.5,
    borderColor: colors.dark_grey,
    backgroundColor: colors.snow,
  },
  dotContainerStyle: {
    marginHorizontal: 5,
  },
});
