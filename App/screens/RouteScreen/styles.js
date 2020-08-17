import { StyleSheet, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `white`,
  },
  contentContainer: {
    margin: 0,
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
});
