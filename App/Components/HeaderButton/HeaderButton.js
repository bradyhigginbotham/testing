import React from 'react';
import { TouchableOpacity, Image, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import Text from '../Text';

const HeaderButton = ({ containerStyle, style, title, onPress, source }) => (
  <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
    {title ? <Text style={style}>{title}</Text> : <Image source={source} style={[{
    resizeMode: `contain`,}, style]} />}
  </TouchableOpacity>
);

HeaderButton.defaultProps = {
  containerStyle: {},
  title: '',
  source: '',
  style: {},
};

HeaderButton.propTypes = {
  style: PropTypes.oneOfType([
    Text.propTypes.style,
    Image.propTypes.style,
    PropTypes.arrayOf([Text.propTypes.style, Image.propTypes.style]),
  ]),
  containerStyle: PropTypes.oneOfType([
    ViewPropTypes.style,
    PropTypes.arrayOf([ViewPropTypes.style]),
  ]),
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HeaderButton;
