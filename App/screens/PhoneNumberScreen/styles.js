import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ApplicationStyles } from '../../Themes'
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: hp('1%'),
    backgroundColor: colors.snow,
    paddingLeft: hp('4%'),
    paddingRight: hp('6%'),
    paddingTop: hp('10%'),
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: hp('4%'),
  },
  Image: {
    width: 70,
    height: 70,
    marginRight: wp('4%'),
    marginBottom: hp('6.2%'),
  },
  title: {
    color: colors.navi,
    fontSize: hp('4.2%'),
    lineHeight: hp('5%'),
  },
  inputContainer: {
    marginVertical: hp('6%'),
  },
  input: {
    borderBottomColor: colors.grey,
  },
  inputImage: {
    width: 30,
    height: 30,
  },
  button: {
    marginTop: 'auto',
  },
});
