import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ApplicationStyles } from '../../Themes';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  button: {
    height: hp('7%'),
    borderRadius: 50,
    backgroundColor: colors.navi,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  loginButtonDisabled: {
    backgroundColor: colors.blue_grey,
  },
  titleStyle: {
    color: colors.white,
    fontSize: hp('1.9%'),
    fontFamily: 'AvenirNext-DemiBold',
  },
  innerContainerStyle: {
    flexDirection: `row`,
    alignItems: `center`
  },
  imageStyle: {
    height: hp('3%'),
    width: hp('3%'),
    marginRight: hp('1.5%'),
  }
});
