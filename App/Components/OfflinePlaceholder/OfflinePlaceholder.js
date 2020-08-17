import React from 'react';
import { Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../Themes/Images';
import colors from '../../Themes/Colors';
import Text from '../Text';
import styles from './styles';

const OfflinePlaceholder = (
  <LinearGradient colors={colors.light_grey_green} style={styles.disableOrdersScreenContainer}>
    <Image source={images.route} style={styles.disableOrdersScreenImage} />
    <Text style={styles.disableOrdersScreenText}>
      {'Go online to see available\norders near you!'}
    </Text>
  </LinearGradient>
);

export default OfflinePlaceholder;
