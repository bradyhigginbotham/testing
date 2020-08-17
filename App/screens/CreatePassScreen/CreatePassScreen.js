import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Text from '../../Components/Text';
import images from '../../Themes/Images';
import colors from '../../Themes/Colors';
import styles from './styles';

const CreatePassScreen = ({
  navigation,
  reset,
  createPassword,
  createPasswordError,
  createPasswordLoading,
}) => {
  const user = navigation.getParam('user', {});
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState('');

  const handlePress = () => setShowPassword(!showPassword);
  const handleSubmit = () => {
    createPassword(user, password);
  };

  useEffect(() => {
    reset();
  }, []);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="always"
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.snow} />
      <View style={styles.titleContainer}>
        <ImageBackground source={images.password} style={styles.ImageContainer}>
          <Image style={styles.Image} source={images.lock} />
        </ImageBackground>
        <Text style={styles.title}>{'Create a new\npassword.'}</Text>
      </View>
      <Text style={styles.text}>
        Your password my be at least 8 characters, and must contain 1 number and 1 capital letter.
      </Text>
      <View style={styles.inputContainer}>
        <Input
          label="password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry={showPassword}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          error={createPasswordError}
          autoFocus
        />
        <TouchableOpacity onPress={() => handlePress()} style={styles.showPass}>
          <Image style={styles.inputImage} source={images.show} />
        </TouchableOpacity>
      </View>
      <Button
        title="Done"
        containerStyle={styles.button}
        onPress={handleSubmit}
        disabled={!password}
        loading={createPasswordLoading}
      />
    </ScrollView>
  );
};

CreatePassScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
  reset: PropTypes.func.isRequired,
  createPassword: PropTypes.func.isRequired,
  createPasswordError: PropTypes.string.isRequired,
  createPasswordLoading: PropTypes.bool.isRequired,
};

export default CreatePassScreen;
