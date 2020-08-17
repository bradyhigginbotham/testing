import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.snow,
    padding: wp(4),
  },
  lineContainer: {
    height: hp(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#2e2f4120',
    borderBottomWidth: 1,
  },
  infoText: {
    color: colors.charcoal_grey,
  },
  deleteContainer: {
    margin: hp(6),
    alignSelf: "center"
  },
  delete: {
    color: colors.fire
  }
});
