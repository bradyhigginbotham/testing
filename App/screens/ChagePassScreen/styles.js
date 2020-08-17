import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(5),
    paddingHorizontal: wp(5),
    backgroundColor: colors.white,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  textContainer: {
    paddingHorizontal: wp(5),
  },
  text: {
    fontSize: hp(1.9),
    textAlign: 'center',
    marginBottom: hp(3),
    color: colors.charcoal_grey,
    fontFamily: 'AvenirNext-Regular',
  },
  saveButtonTouchable: {
    marginRight: hp(2),
  },
  saveButton: {
    fontSize: hp(2),
    color: colors.blue_grey,
    fontFamily: 'AvenirNext-DemiBold',
  },
});
