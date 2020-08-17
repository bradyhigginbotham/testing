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
    paddingHorizontal: wp('9%'),
    paddingVertical: hp('6%'),
    justifyContent: 'flex-end',
    backgroundColor: '#69bfb0',
  },
  image: {
    width: wp('78%'),
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginBottom: hp('11%'),
  },
  applyButton: {
    height: hp('7%'),
    borderRadius: hp('10%'),
    backgroundColor: colors.snow,
  },
  text: {
    color: colors.navi,
    fontSize: hp('1.9%'),
    marginTop: hp('1.3%'),
    textAlign: 'center',
  },
  titleStyle: {
    color: colors.navi,
  },
  buttonContainer: {
    marginBottom: hp('3%'),
  },
});
