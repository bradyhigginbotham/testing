import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from '../../Themes';

export default StyleSheet.create({
  panelContainer: {
    position: `absolute`,
    height: hp('100%'),
    width: wp('100%'),
  },
  panelWrapper: {
    zIndex: 1000,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: hp('120%'),
  },
  panel: {
    flexWrap: `wrap`,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  topRounder: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
