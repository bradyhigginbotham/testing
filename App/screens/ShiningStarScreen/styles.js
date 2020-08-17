import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ApplicationStyles, Fonts } from '../../Themes';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingBottom: hp('1%'),
    backgroundColor: '#69bfb0',
    paddingLeft: hp('4%'),
    paddingRight: hp('4%'),
    paddingTop: hp('10%'),
  },
  title: {
    fontFamily: "AvenirNext-DemiBold",
    fontSize: hp(4),
    color: colors.white,
    marginBottom: hp(2),
  },
  shadow: {
    elevation: 2,
    shadowColor: colors.coal,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  missingDataContainer: {
    backgroundColor: colors.white,
    
    borderRadius: hp('3.5'),
    height: hp('7'),
    marginTop: hp(3),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hp(2),
  },
  continueButton: {
    backgroundColor: colors.white,
  },
  continueButtonTitle: {
    color: colors.ligh_navi,
  },
  checkmark: {
    width: hp(3.5),
    height: hp(3.5),
    marginRight: hp(2),
  },
  checkmarkEmpty: {
    width: hp(3.5),
    height: hp(3.5),
    marginRight: hp(2),
    borderColor: colors.ligh_navi,
    borderWidth: 1,
    borderRadius: hp(1.75),
  },
  continueButtonContainer: {
    position: "absolute",
    left: hp(5),
    right: hp(5),
    bottom: hp(4),
  }
});
