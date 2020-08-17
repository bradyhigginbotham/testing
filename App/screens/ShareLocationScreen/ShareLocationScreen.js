import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar, Image, ImageBackground, Platform } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import PropTypes from 'prop-types';
import eventEmitter from '../../Services/EventEmitter';
import Button from '../../Components/Button';
import Text from '../../Components/Text';
import images from '../../Themes/Images';
import colors from '../../Themes/Colors';
import styles from './styles';

const ShareLocationScreen = ({ navigation }) => {
  const locationPermission = Platform.select({
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
  });

  const getLocationAccess = () =>
    request(locationPermission)
      .then(result => {
        if (result === 'denied' || result === 'blocked') {
          eventEmitter.emit('showNotification', 'Please allow location access from phone settings');
        }
        if (result === 'unavailable') {
          eventEmitter.emit(
            'showNotification',
            'Keep in mind that you will need location for using this app'
          );
        }
        navigation.navigate('App');
      })
      .catch(() =>
        eventEmitter.emit('showNotification', 'An error occurred while getting location')
      );

  return (
    <LinearGradient colors={colors.light_grey_green} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.light_green} />
      <ImageBackground source={images.locationBg} style={styles.ImageContainer}>
        <Image style={styles.Image} source={images.location} />
      </ImageBackground>
      <Text style={styles.title}>{'Hi Samantha!\nDon’t miss out on\norders near you!'}</Text>
      <Button
        title="Share My Location"
        style={styles.button}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitleStyle}
        onPress={getLocationAccess}
      />
    </LinearGradient>
  );
};

ShareLocationScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ShareLocationScreen;
