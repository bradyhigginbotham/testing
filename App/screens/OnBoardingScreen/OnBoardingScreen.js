import React from 'react';
import { Image, StatusBar, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import styles from './styles';
import images from '../../Themes/Images';
import colors from '../../Themes/Colors';
import Button from '../../Components/Button';
import Text from '../../Components/Text';

const OnBoardingScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={colors.light_grey_green} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.light_green} />
      <Image source={images.logo} containerStyle={styles.imageContainer} style={styles.image} />
      <Button
        title="Log In"
        onPress={() => navigation.navigate('LoginScreen')}
        containerStyle={styles.buttonContainer}
      />
      <Button
        titleStyle={styles.titleStyle}
        title="Apply Today"
        style={styles.applyButton}
        containerStyle={styles.buttonContainer}
        onPress={() => navigation.navigate('ApplyNowScreen')}
      />
      <Text style={styles.text}>Wait, I don’t want to do laundry…</Text>
    </LinearGradient>
  );
};

OnBoardingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default OnBoardingScreen;
