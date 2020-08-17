import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
  Image,
  ViewPropTypes,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import styles from './styles';

const SUPPORTS_NATIVE_FEEDBACK = Platform.OS === 'android' && Platform.Version >= 21;

export const ButtonFeedback = SUPPORTS_NATIVE_FEEDBACK ? TouchableNativeFeedback : TouchableOpacity;

const Button = ({ title, image, style, titleStyle, imageStyle, containerStyle, disabled, loading, ...rest }) => {
  return (
    <View style={[styles.buttonContainer, containerStyle]}>
      <ButtonFeedback {...rest} disabled={disabled} activeOpacity={0.7}>
        <View style={[styles.button, style, disabled && styles.loginButtonDisabled]}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <View style={styles.innerContainerStyle}>
              {image && (<Image source={image} style={{...styles.imageStyle, ...imageStyle}}/>)}
              <Text style={{ ...styles.titleStyle, ...titleStyle }}>{title}</Text>
            </View>
          )}
        </View>
      </ButtonFeedback>
    </View>
  );
};

Button.defaultProps = {
  style: {},
  title: '',
  image: undefined,
  titleStyle: {},
  imageStyle: {},
  containerStyle: {},
  disabled: false,
  loading: false,
};

Button.propTypes = {
  style: PropTypes.oneOfType([
    ViewPropTypes.style,
    PropTypes.arrayOf([ViewPropTypes.style]),
  ]),
  titleStyle: PropTypes.oneOfType([
    Text.propTypes.style,
    PropTypes.arrayOf([Text.propTypes.style]),
  ]),
  imageStyle: PropTypes.oneOfType([
    Image.propTypes.style,
    PropTypes.arrayOf([Image.propTypes.style]),
  ]),
  containerStyle: PropTypes.oneOfType([
    ViewPropTypes.style,
    PropTypes.arrayOf([ViewPropTypes.style]),
  ]),
  title: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
