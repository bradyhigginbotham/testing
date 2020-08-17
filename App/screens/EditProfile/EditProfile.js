import React, {useState, useEffect, useRef} from 'react';
import {View, Image, TouchableOpacity, Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import {AndroidBackHandler} from 'react-navigation-backhandler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import NavigationService from '../../Services/NavigationService';
import ImagePicker from 'react-native-image-picker';
import { Portal } from 'react-native-paper'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
// Components
import Text from '../../Components/Text';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import HeaderButton from '../../Components/HeaderButton';
import ProfileBottomsheet from '../../Components/ProfileBottomsheet';
import colors from '../../Themes/Colors';

// Theme and Styles
import styles from './styles';
import images from '../../Themes/Images';
import BottomSheet from '../../Components/BottomSheet';

const PopColorSelection = ({ colors, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.popColorTouchable}
      onPress={() => {
        onPress(colors);
      }}>
      <LinearGradient colors={colors} style={styles.popColorGradient}>
        {selected && (
          <View style={styles.selectedPopColorTouchable}>
            <Image
              source={require('../../Images/pop_color_selected.png')}
              style={styles.selectedCheckmark}
            />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const EditProfile = ({
  navigation,
  updateUserInformation,
  updateUserInformationError,
  updateUserInformationLoading,
  updateProfilePicture,
  user,
  updateUserLoading,
  updateUser,
  deleteProfilePicture,
  user: {phone_number, name, email, profile_picture},
}) => {
  
  const bottomsheet = useRef(null);
  const popColorsBottomSheet = useRef(null);

  const [userNewName, setUserNewName] = useState(user.first_name + ' ' + user.last_name);
  const [userNewEmail, setUserNewEmail] = useState(email);
  const [userNewPhoneNumber, setUserNewPhoneNumber] = useState(phone_number);
  const [popColors, setPopColors] = useState(user.pop_colors || '');
  const [bio, setBio] = useState(user.bio || '');
  const [loading, setLoading] = useState(updateUserLoading);

  const saveChanges = () => {

    let nameComponents = userNewName.split(` `);
    const family_name = nameComponents.pop();
    const given_name = nameComponents.join(` `);

    const info = {
      name: userNewName,
      phone_number: userNewPhoneNumber,
      given_name,
      family_name,
      email: userNewEmail,
    };

    updateUserInformation(info);

    if (user.bio != bio) {
      updateUser({bio})
    }

    bottomsheet.current.close();
    popColorsBottomSheet.current.close();
  };

  const isColorSelected = color => {
    if (!popColors) {
      return false;
    }

    return (
      color.length === popColors.length &&
      color.every((value, index) => value === popColors[index])
    );
  };

  const discardChanges = () => {
    bottomsheet.current.close();
    popColorsBottomSheet.current.close();
    NavigationService.goBack();
  };

  const handleChange = (fieldFunction, field, text) => {
    fieldFunction(text);
    if (text !== field) {
      navigation.setParams({informationChange: true});
    } else {
      navigation.setParams({informationChange: false});
    }
  };

  const donePopColorPressed = () => {
    popColorsBottomSheet.current.close()
  }

  const savePopColors = (colors) => {
    setPopColors(colors);
    updateUser({ pop_colors: colors }, false);
  }

  const handleBack = () => {

    if (navigation.getParam('informationChange')) {
      bottomsheet.current.launch();
      return true;
    }

    return false;
  };

  const passBottomsheetAsParam = () => {
    navigation.setParams({bottomsheet});
  };

  const editProfilePicturePressed = () => {
    ImagePicker.showImagePicker(
      {
        cameraType: 'front',
        maxWidth: 600,
        maxHeight: 600,
        customButtons: user.profile_picture ? [{ name: 'fb', title: 'Remove Profile Photo' }] : [],
      },
      response => {
        if (response && response.data) {
          updateProfilePicture({ picture_base64: response.data });
        } else if (response.customButton) {
          deleteProfilePicture()
        }
      },
    );
  }

  useEffect(() => passBottomsheetAsParam(), []);

  const profileSource = profile_picture
    ? { uri: profile_picture }
    : require('../../Images/profile_empty.png');
    
  return (
    <AndroidBackHandler onBackPress={handleBack}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
        extraHeight={hp(10)}
        extraScrollHeight={hp(10)}>
        <LinearGradient
          colors={popColors || colors.popColorGradient.default}
          style={styles.washrProfileGradient}
        />
        <View style={styles.washrProfileHeaderContainer}>
          <View style={styles.editPopColorsContainer} />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={editProfilePicturePressed}
            style={styles.washrProfileAvatarContainer}>
            <Image style={styles.washrProfileAvatar} source={profileSource} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editPopColorsContainer}
            onPress={() => {
              popColorsBottomSheet.current.launch();
            }}>
            <Image
              style={styles.editPopColors}
              source={require('../../Images/edit_white.png')}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={editProfilePicturePressed}>
          <Text style={styles.editProfilePhoto}>Edit Profile Photo</Text>
        </TouchableOpacity>

        <Input
          value={userNewName}
          onChangeText={text => handleChange(setUserNewName, name, text)}
          label="Name"
          style={styles.input}
          keyboardType="default"
          autoCapitalize="words"
          returnKeyType="next"
        />
        <Input
          value={userNewEmail}
          onChangeText={text => handleChange(setUserNewEmail, email, text)}
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          error={updateUserInformationError.email}
        />
        <Input
          value={userNewPhoneNumber}
          onChangeText={text =>
            handleChange(setUserNewPhoneNumber, phone_number, text)
          }
          label="Phone Number"
          style={styles.input}
          keyboardType="number-pad"
          autoCapitalize="none"
          returnKeyType="next"
          error={updateUserInformationError.phone_number}
        />
        <Input
          value={bio}
          onChangeText={text => {
            setBio(text);
            navigation.setParams({ informationChange: true });
          }}
          label="My Bio"
          style={styles.input}
          keyboardType="default"
          autoCapitalize="none"
          returnKeyType="done"
          multiline
          maxLength={200}
        />
        <Text style={styles.bioLength}>{bio.length}/200</Text>
        <View style={styles.changePassContainer}>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('ChagePass')}
            style={styles.changePassTouchable}>
            <Text style={styles.changePassText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {navigation.getParam('informationChange') && (
        <Button
          onPress={saveChanges}
          title="Save Changes"
          containerStyle={styles.button}
          loading={updateUserInformationLoading}
        />
      )}
      <ProfileBottomsheet
        saveChanges={saveChanges}
        discardChanges={discardChanges}
        bottomsheet={bottomsheet}
      />
      <Portal>
        <BottomSheet ref={popColorsBottomSheet}>
          <View style={styles.popColorsBottomSheetContainer}>
            <Text style={styles.popColorSubtitle}>
              Choose a pop of color for your profile cover image!
            </Text>
            <View style={styles.popColorsContainer}>
              <PopColorSelection
                colors={colors.popColorGradient.blue}
                selected={isColorSelected(colors.popColorGradient.blue)}
                onPress={savePopColors}
              />
              <PopColorSelection
                colors={colors.popColorGradient.magenta}
                selected={isColorSelected(colors.popColorGradient.magenta)}
                onPress={savePopColors}
              />
              <PopColorSelection
                colors={colors.popColorGradient.green}
                selected={isColorSelected(colors.popColorGradient.green)}
                onPress={savePopColors}
              />
              <PopColorSelection
                colors={colors.popColorGradient.purple}
                selected={isColorSelected(colors.popColorGradient.purple)}
                onPress={savePopColors}
              />
            </View>

            <Button
              title="Done"
              containerStyle={styles.doneButtonContainer}
              onPress={donePopColorPressed}
              disabled={popColors === []}
            />
          </View>
        </BottomSheet>
      </Portal>
    </AndroidBackHandler>
  );
};

EditProfile.navigationOptions = ({navigation}) => ({
  headerLeft: (
    <HeaderButton
      source={images.close}
      style={styles.closeButton}
      onPress={() => {
        Keyboard.dismiss()
        
        const {informationChange, bottomsheet} = navigation.state.params;
        if (informationChange) {
          bottomsheet.current.launch();
        } else {
          NavigationService.goBack();
        }
      }}
      containerStyle={styles.closeButtonContainer}
    />
  ),
});

EditProfile.propTypes = {
  updateUserInformation: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    setParams: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    phone_number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditProfile;
