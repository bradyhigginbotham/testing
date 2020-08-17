import { StyleSheet, Platform } from 'react-native';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  badgeContainer: {
    top: 0,
    width: 16,
    height: 16,
    left: '54%',
    borderRadius: 9,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: colors.light_grey,
  },
  badge: {
    ...Platform.select({
      android: {
        lineHeight: 10,
      },
    }),
    alignSelf: 'center',
    color: colors.white,
    backgroundColor: colors.pastel_red,
  },
});
