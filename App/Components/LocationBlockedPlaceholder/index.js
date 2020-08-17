import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Platform, Linking } from 'react-native';

import Button from '../../Components/Button';
import colors from '../../Themes/Colors';
import Text from '../Text';
import styles from './styles';

function LocationBlockedPlaceholder() {

  const iOSButton = (
    <Button 
      title="Open Settings" 
      containerStyle={styles.locationButtonContainer}
      onPress={() => {
        Linking.openURL(`app-settings:`);
      }}
    />
  );

  const androidButton = (
    <Button 
      title="Enable Location" 
      containerStyle={styles.locationButtonContainer}
      onPress={() => {
        Permissions.check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(response => {
          if (response === RESULTS.BLOCKED) {
            alert(`You have disabled location services and will have to enable them within your system settings.`);
          }
        });
      }}
    />
  );

  return (
    <LinearGradient colors={colors.light_grey_green} style={styles.disableOrdersScreenContainer}>
      <Text style={styles.disableOrdersScreenText}>
        {'Share your Location To find available orders close to you'}
      </Text>
      {Platform.OS === `ios` ? iOSButton : androidButton}
    </LinearGradient>
  )
}

export default LocationBlockedPlaceholder;
