import { StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  switch: {
    marginRight: Platform.OS === 'ios' ? wp('4%') : wp('2%'),
    backgroundColor: colors.blue_gray,
  },
});
