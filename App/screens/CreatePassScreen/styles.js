import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';
import { ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: colors.snow,
    paddingHorizontal: hp('4%'),
    paddingTop: hp('10%'),
    paddingBottom: hp('1%'),
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: hp('4%'),
  },
  ImageContainer: {
    width: 70,
    height: 70,
    marginRight: wp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    height: hp('5%'),
    resizeMode: 'contain',
  },
  inputImage: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  showPass: {
    position: 'absolute',
    top: hp('4.5%'),
    left: wp('74%'),
    zIndex: 100,
  },
  title: {
    color: colors.navi,
    fontSize: hp('4.2%'),
    lineHeight: hp('5%'),
  },
  text: {
    color: '#424952',
    lineHeight: hp('3%'),
    textAlign: 'center',
    fontFamily: 'AvenirNext-Regular',
  },
  inputContainer: {
    marginVertical: hp('6%'),
  },
  button: {
    marginTop: 'auto',
    marginBottom: wp('3%'),
  },
});
