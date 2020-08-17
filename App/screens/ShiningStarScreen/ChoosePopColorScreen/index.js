import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StatusBar, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { View } from 'react-native-animatable';
import { TouchableRipple } from 'react-native-paper';

import Text from '../../../Components/Text';
import colors from '../../../Themes/Colors';
import styles from './styles';
import UsersCreators from '../../../Redux/UsersRedux';
import Button from '../../../Components/Button';

const PopColorSelection = ({ colors, selected, onPress }) => {

  return (
    <TouchableRipple
      styles={styles.popColorTouchable}
      onPress={() => {
        onPress(colors);
      }}>
      <LinearGradient colors={colors} style={styles.popColorGradient}>
        {selected && (
          <View style={styles.selectedPopColorTouchable}>
            <Image
              source={require('../../../Images/pop_color_selected.png')}
              style={styles.selectedCheckmark}
            />
          </View>
        )}
      </LinearGradient>
    </TouchableRipple>
  );  
};

const ChoosePopColorScreen = ({
  navigation,
  updateUser,
  user,
  updateUserLoading,
}) => {
  
  const [popColors, setPopColors] = useState(user.pop_colors || []);
  const [loading, setLoading] = useState(updateUserLoading);

  const savePressed = () => {
    updateUser({ pop_colors: popColors }, true);
  };

  const isColorSelected = (color) => {
    if (!popColors) {
      return false
    }

    return color.length === popColors.length &&
      color.every((value, index) => value === popColors[index]);
  }

  useEffect(() => {
    setLoading(updateUserLoading);
  }, [updateUserLoading]);

  const profileSource = user.profile_picture
    ? { uri: user.profile_picture }
    : require('../../../Images/profile_empty.png');
    
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.light_green}
      />
      <Image source={profileSource} style={styles.profilePicture} />
      <Text style={styles.title}>Last step, {user.first_name}!</Text>
      <Text style={styles.subtitle}>
        Choose a pop of color for your profile cover image!
      </Text>
      <View style={styles.colorsContainer}>
        <PopColorSelection
          colors={colors.popColorGradient.blue}
          selected={isColorSelected(colors.popColorGradient.blue)}
          onPress={setPopColors}
        />
        <PopColorSelection
          colors={colors.popColorGradient.magenta}
          selected={isColorSelected(colors.popColorGradient.magenta)}
          onPress={setPopColors}
        />
        <PopColorSelection
          colors={colors.popColorGradient.green}
          selected={isColorSelected(colors.popColorGradient.green)}
          onPress={setPopColors}
        />
        <PopColorSelection
          colors={colors.popColorGradient.purple}
          selected={isColorSelected(colors.popColorGradient.purple)}
          onPress={setPopColors}
        />
      </View>

      <Button
        title="Done"
        containerStyle={styles.doneButtonContainer}
        onPress={savePressed}
        disabled={popColors === []}
      />
    </View>
  );
};

ChoosePopColorScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ChoosePopColorScreen.defaultProps = {
  user: { pop_colors: [] },
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
)(ChoosePopColorScreen);
