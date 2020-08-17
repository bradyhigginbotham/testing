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
    paddingLeft: wp('5%'),
    paddingBottom: hp('2.5%'),
    paddingTop: hp('5%'),
  },
  block1: {
    width: wp('30%'),
    height: hp('4.8%'),
    borderRadius: hp('1.2%'),
    backgroundColor: colors.whitish_grey,
  },
  block2: {
    width: wp('24%'),
    height: hp('2.4%'),
    borderRadius: hp('0.8%'),
    backgroundColor: colors.whitish_grey,
  },
  surface: {
    elevation: 2,
    marginTop: hp('1.6%'),
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  title: {
    color: colors.navi,
    fontSize: hp('4%'),
    lineHeight: hp('5%'),
    textAlign: 'left',
    marginBottom: hp('1.5%'),
  },
  itemContainer: {
    height: hp('11.5%'),
    flexDirection: 'row',
    paddingRight: wp('3%'),
    paddingLeft: wp('4%'),
    paddingVertical: hp('1.5%'),
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'space-between',
    backgroundColor: colors.grey_white,
  },
  subtitle: {
    fontSize: hp('2.1%'),
    marginTop: hp('3.4%'),
    color: colors.charcoal_grey,
  },
  text: {
    fontSize: hp('2.1%'),
    marginLeft: wp('6%'),
    marginVertical: hp('1%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  endText: {
    fontSize: hp('2.1%'),
    marginLeft: wp('6%'),
    marginTop: hp('1%'),
    marginBottom: hp('3%'),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Medium',
  },
  titleStyle: {
    color: colors.grey_white,
    fontSize: hp('1.7%'),
  },
  button: {
    backgroundColor: colors.pale_teal,
    height: hp('5.3%'),
  },
  buttonContainer: {
    width: wp('19%'),
    height: hp('5.3%'),
    marginBottom: 0,
  },
  buttonOnPress: {
    backgroundColor: colors.pale_teal,
  },
  titleStyleOnPress: {
    color: colors.snow,
  },
  leftSide: {
    justifyContent: 'space-between',
  },
  rightSide: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  startButton: {
    zIndex: 100000,
  },
  startButtonContainer: {
    width: wp('85%'),
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 0,
    marginRight: wp('5%'),
  },
});
