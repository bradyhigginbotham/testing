import { DefaultTheme } from 'react-native-paper';
import colors from './Colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.blue_grey,
    text: colors.navi,
    placeholder: colors.blue_grey,
    error: colors.pastel_red,
  },
};

export default theme;
