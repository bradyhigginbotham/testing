import { StyleSheet, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: `white`,
  },
  instructionsText: {
    color: colors.greyish_blue,
    marginHorizontal: wp(20),
    marginVertical: wp(5),
    textAlign: `center`,
  },
  startButtonContainer: {
    width: wp('85%'),
    alignSelf: 'center',
    bottom: hp('2.5%'),
    position: 'absolute',
    borderRadius: 50,
  },
  optionContainer: {
    marginVertical: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftText: {
    fontSize: hp('2.5%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  rightText: {
    fontSize: hp('2.5%'),
    color: colors.blue_grey,
    fontFamily: 'AvenirNext-Medium',
  },
});
