import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StatusBar, Image, TextInput, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { View } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Text from '../../../Components/Text';
import colors from '../../../Themes/Colors';
import styles from './styles';
import UsersCreators from '../../../Redux/UsersRedux';
import Button from '../../../Components/Button';

const CreateBioScreen = ({ navigation, updateUser, user, updateUserLoading }) => {

  const [charCount, setCharCount] = useState(user.bio ? user.bio.length : 0);
  const [bio, setBio] = useState(user.bio || "");
  const [loading, setLoading] = useState(updateUserLoading);

  const savePressed = () => {
    updateUser({bio}, true)
  }

  useEffect(() => {
    setLoading(updateUserLoading);
  }, [updateUserLoading]);

  const profileSource = user.profile_picture
    ? { uri: user.profile_picture }
    : require('../../../Images/profile_empty.png');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
      keyboardShouldPersistTaps="always">
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.light_green}
      />
      <Image
        source={profileSource}
        style={styles.profilePicture}
      />
      <Text style={styles.title}>Share a little bit about yourself.</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          autoFocus
          multiline
          placeholder="Tell hampr customers something about yourself, ie why you joined the washr team or even your favorite food!"
          onChangeText={v => {
            setBio(v.substring(0, 200));
            setCharCount(Math.min(200, v.length));
          }}
          value={bio}
        />
      </View>
      <Text style={styles.charCount}>{charCount}/200</Text>

      <Button
        title="Save"
        containerStyle={styles.doneButtonContainer}
        onPress={savePressed}
        disabled={!bio || bio.length === 0}
      />
    </ScrollView>
  );
};

CreateBioScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

CreateBioScreen.defaultProps = {
  user: { profile_picture: '' },
  updateProfilePictureLoading: false,
};

const mapStateToProps = ({ users: { user, updateUserLoading } }) => ({
  user,
  updateUserLoading,
});

const mapDispatchToProps = {
  updateUser: UsersCreators.updateUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateBioScreen);
