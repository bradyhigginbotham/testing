import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar, Image } from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import { View } from 'react-native-animatable';
import { TouchableRipple } from 'react-native-paper';

import Button from '../../Components/Button';
import Text from '../../Components/Text';
import colors from '../../Themes/Colors';
import styles from './styles';
import UsersCreators from '../../Redux/UsersRedux'
import ProgressModal from '../../Components/ProgressModal';

const MissingDataButton = ({title, selected, onPress}) => {
  return (
    <View style={styles.shadow}>
      <TouchableRipple style={styles.missingDataContainer} onPress={onPress}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          {selected && (
            <Image
              source={require('../../Images/shining_star_check.png')}
              style={styles.checkmark}
            />
          )}
          {!selected && <View style={styles.checkmarkEmpty} />}
          <Text>{title}</Text>
        </View>
      </TouchableRipple>
    </View>
  );
}

const ShiningStarScreen = ({ navigation, updateProfilePicture, setProfilePicture, user }) => {

  const hasName = true;

  const [hasPopColor, setHasPopColor] = useState(
    user.pop_colors && user.pop_colors.length > 0,
  );

  const [hasProfilePicture, setHasProfilePicture] = useState(
    user.profile_picture.length > 0
  );

  const [hasBio, setHasBio] = useState(
    user.bio && user.bio.length > 0,
  );

  useEffect(() => {
    setHasProfilePicture(user.profile_picture.length > 0);
    setHasBio(user.bio && user.bio.length > 0);
    setHasPopColor(user.pop_colors && user.pop_colors.length > 0);
  }, [user])
  
  const pickProfileImage = () => {
    ImagePicker.showImagePicker({ cameraType: 'front', maxWidth: 600, maxHeight: 600, }, response => {
      if (response && response.data && response.uri) {
        const {uri, data} = response;
        setProfilePicture(uri);
        updateProfilePicture({ picture_base64: data });
      }
    });
  }

  const continuePressed = () => {
    if (!hasProfilePicture) {
      pickProfileImage()
      return
    }

    if(!hasBio) {
      navigation.navigate("CreateBioScreen")
      return
    }

    if (!hasPopColor) {
      navigation.navigate('ChoosePopColorScreen');
      return;
    }

    navigation.popToTop()
  }

  return (
    <LinearGradient colors={colors.light_grey_green} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.light_green}
      />
      <Text style={styles.title}>
        Be the shining star{`\n`}we know you are!
      </Text>
      <MissingDataButton
        title="Your Name"
        selected={hasName}
        onPress={() => {}}
      />
      <MissingDataButton
        title="Add a Profile Photo"
        selected={hasProfilePicture}
        onPress={pickProfileImage}
      />
      <MissingDataButton
        title="Add a Mini Bio, 1-2 sentences."
        selected={hasBio}
        onPress={() => {
          navigation.navigate('CreateBioScreen');
        }}
      />
      <MissingDataButton
        title="Choose your pop of color!"
        selected={hasPopColor}
        onPress={() => {
          navigation.navigate('ChoosePopColorScreen');
        }}
      />
      <Button
        title="Continue"
        containerStyle={styles.continueButtonContainer}
        style={styles.continueButton}
        titleStyle={styles.continueButtonTitle}
        onPress={continuePressed}
      />
    </LinearGradient>
  );
};

ShiningStarScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ShiningStarScreen.defaultProps = {
  user: { profile_picture: '', bio: '', pop_colors: [] },
};


const mapStateToProps = ({ users: { user } }) => ({
  user,
});

const mapDispatchToProps = dispatch => {
  return {
    updateProfilePicture: (parameters) => dispatch(UsersCreators.updateProfilePicture(parameters)),
    setProfilePicture: (source) => dispatch(UsersCreators.setProfilePicture(source)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShiningStarScreen);
