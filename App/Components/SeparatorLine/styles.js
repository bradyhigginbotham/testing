import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  separator: {
    height: 1,
    marginHorizontal: wp('5%'),
    backgroundColor: colors.light_grey2,
  },
});
