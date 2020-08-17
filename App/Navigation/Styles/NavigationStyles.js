import {StyleSheet, Platform} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  header: {
    backgroundColor: colors.backgroundColor,
    elevation: 0,
    borderBottomWidth: 0,
  },
  headerFlat: {
    elevation: 0,
    borderBottomWidth: 0,
  },
  headerTitle: {
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  headerTitleWhite: {
    fontSize: hp('2.4%'),
    color: colors.white,
    fontFamily: 'AvenirNext-DemiBold',
  },
  headerButtonTitleStyle: {
    color: colors.navi,
    fontSize: hp('2%'),
  },
  icon: {
    width: 25,
    height: 25,
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
  statusBarMargin: {
    marginTop: Platform.OS === 'android' ? getStatusBarHeight() : undefined,
  },
});
