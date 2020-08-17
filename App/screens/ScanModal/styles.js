import { StyleSheet, StatusBar, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Header } from 'react-navigation';
import colors from '../../Themes/Colors';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: `black`,
  },
  preview: {
    width: wp('100%'),
    height,
  },
  overlay: {
    width: wp(100),
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  simulateButton: {
    width: wp('85%'),
    alignSelf: 'center',
    bottom: hp('4%'),
    position: 'absolute',
  },
  qrScanner: {
    height,
    width,
  },
  border: {
    backgroundColor: colors.blue_grey,
    height: '100%',
    width: 200,
    flex: 1,
  },
});
