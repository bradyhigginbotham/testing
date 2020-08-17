import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import { Surface, TouchableRipple } from 'react-native-paper';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from './styles';

const Card = ({ children, style, showBorder, onPress, containerStyle, backgroundItem }) => (
  <Surface style={[styles.card, style]}>
    <View
      style={[styles.backgroundItem, backgroundItem, showBorder && { paddingLeft: wp('1.2%'), paddingBottom: wp('0.6%')}]}
    >
      <View style={styles.rippleContainer}>
        <TouchableRipple
          borderless
          onPress={onPress}
          style={styles.ripple}
          rippleColor="rgba(0, 0, 0, .1)"
        >
          <View style={[styles.content, containerStyle]}>{children}</View>
        </TouchableRipple>
      </View>
    </View>
  </Surface>
);

Card.defaultProps = {
  style: {},
  container: {},
  showBorder: false,
  onPress: () => {},
  children: undefined,
};

Card.propTypes = {
  onPress: PropTypes.func,
  showBorder: PropTypes.bool,
  container: PropTypes.oneOfType([ViewPropTypes.style, PropTypes.arrayOf([ViewPropTypes.style])]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  style: PropTypes.oneOfType([ViewPropTypes.style, PropTypes.arrayOf([ViewPropTypes.style])]),
};

export default Card;
