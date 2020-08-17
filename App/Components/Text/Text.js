import React from 'react';
import { Text as RNText } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Text = ({ style, children, numberOfLines }) => (
  <RNText
    allowFontScaling={false}
    numberOfLines={numberOfLines}
    adjustsFontSizeToFit
    style={[styles.text, style]}>
    {children}
  </RNText>
);

Text.defaultProps = {
  style: {},
};


Text.propTypes = {
  style: PropTypes.oneOfType([RNText.propTypes.style, PropTypes.arrayOf([RNText.propTypes.style])]),
  numberOfLines: PropTypes.number,
  children: PropTypes.string.isRequired,
};

export default Text;
