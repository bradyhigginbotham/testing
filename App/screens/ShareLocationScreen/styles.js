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
    paddingBottom: hp('1%'),
    backgroundColor: '#69bfb0',
    paddingLeft: hp('4%'),
    paddingRight: hp('4%'),
    paddingTop: hp('10%'),
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: hp('4%'),
  },
  ImageContainer: {
    width: 90,
    height: 90,
    alignItems: 'center',
    marginRight: wp('4%'),
    marginBottom: hp('3%'),
    justifyContent: 'center',
  },
  Image: {
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    color: colors.snow,
    fontSize: hp('4%'),
    lineHeight: hp('5%'),
    marginBottom: hp('10%'),
  },
  button: {
    backgroundColor: colors.snow,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: wp('3%'),
  },
  buttonTitleStyle: {
    color: colors.navi,
    fontFamily: 'AvenirNext-DemiBold',
  },
});
