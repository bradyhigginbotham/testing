import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ApplicationStyles } from '../../Themes';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingLeft: hp('4%'),
    paddingTop: hp('10%'),
    paddingRight: hp('6%'),
    paddingBottom: hp('1%'),
    backgroundColor: colors.snow,
  },
  title: {
    color: colors.navi,
    fontSize: hp('4.2%'),
    lineHeight: hp('5%'),
    textAlign: 'left',
    marginBottom: hp('5%'),
  },
  text: {
    color: colors.charcoal_grey,
    fontSize: hp('2.5%'),
    lineHeight: hp('3%'),
    textAlign: 'left',
  },
  verifyNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    marginVertical: hp('4%'),
    marginHorizontal: wp('1.3%'),
    textAlign: 'center',
    fontSize: hp('6%'),
    borderBottomColor: colors.grey,
    color: colors.charcoal_grey,
    borderBottomWidth: 3.3,
    width: wp('15%'),
  },
  inputSelected: {
    marginVertical: hp('4%'),
    marginHorizontal: wp('1.3%'),
    textAlign: 'center',
    fontSize: hp('6%'),
    color: colors.charcoal_grey,
    borderBottomColor: colors.greyish_blue,
    borderBottomWidth: 3.3,
    width: wp('15%'),
  },
  containerStyle: {
    width: wp('18%'),
  },
  buttonContainer: {
    marginTop: 'auto',
  },
});
