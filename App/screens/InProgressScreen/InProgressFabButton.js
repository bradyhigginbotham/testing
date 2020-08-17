import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Surface, TouchableRipple } from 'react-native-paper';

// Components
import Text from '../../Components/Text';

// Styles
import styles from './styles';
import images from '../../Themes/Images';

const InProgressFabButton = () => (
  <Surface style={styles.fabSurface}>
    <TouchableRipple
      borderless
      style={styles.ripple}
      onPress={() => {}}
      rippleColor="rgba(0, 0, 0, .1)"
    >
      <View style={styles.fabContainer}>
        <Image source={images.scan} style={styles.fabIcon} />
        <Text style={styles.fabText}>scan</Text>
      </View>
    </TouchableRipple>
  </Surface>
);

export default InProgressFabButton;
