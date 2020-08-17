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
  scrollContainer: {
    flexGrow: 1,
  },
  text: {
    color: colors.navi,
    fontSize: hp('1.9%'),
    textAlign: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },
  card: {
    width: '96%',
    alignSelf: 'flex-end',
    borderTopLeftRadius: hp('4%'),
    borderBottomLeftRadius: hp('4%'),
    backgroundColor: colors.snow,
    justifyContent: 'flex-end',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('3%'),
    marginBottom: hp('2.5%'),
    marginTop: hp('4.5%'),
  },
  input: {
    height: hp('9%'),
  },
  loginButton: {
    height: hp('6.5%'),
  },
  buttonContainerStyle: {
    marginTop: hp('1%'),
    marginBottom: hp('3%'),
    height: hp('6.5%'),
  },
});
