import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ApplicationStyles } from '../../Themes';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    marginBottom: hp('3%'),
    justifyContent: 'flex-end',
  },
  input: {
    paddingLeft: 0,
    fontFamily: 'AvenirNext-Medium',
    backgroundColor: colors.transparent,
  },
  error: {
    color: colors.pastel_red,
    fontSize: hp('1.5%'),
    position: 'absolute',
    bottom: hp('-2.8%'),
    textTransform: 'uppercase',
  },
});
