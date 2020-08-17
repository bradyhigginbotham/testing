import React from 'react';
import { TextInput } from 'react-native-paper';
import { ViewPropTypes, Text as RNText, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import styles from './styles';
import colors from '../../Themes/Colors';

const Input = ({
  inputRef,
  label,
  style,
  containerStyle,
  error,
  autoFocus,
  maxLength,
  keyboardType,
  onChangeText,
  multiline,
  secureTextEntry,
  underlineColor,
  ...rest
}) => (
  <View style={[styles.container, containerStyle]}>
    <TextInput
      multiline={multiline}
      ref={inputRef}
      label={label}
      padding={0}
      fontWeight="500"
      maxLength={maxLength}
      autoFocus={autoFocus}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      style={[styles.input, style]}
      underlineColor={error ? colors.pastel_red : underlineColor}
      secureTextEntry={secureTextEntry}
      {...rest}
    />
    {!!error && <Text style={styles.error}>{error}</Text>}
  </View>
);

Input.defaultProps = {
  style: {},
  containerStyle: {},
  underlineColor: colors.grey,
  secureTextEntry: false,
  maxLength: 100,
  keyboardType: 'default',
  onChangeText: () => {},
  autoFocus: false,
  error: '',
};

Input.propTypes = {
  style: PropTypes.oneOfType([
    RNText.propTypes.style,
    PropTypes.arrayOf([RNText.propTypes.style]),
    ViewPropTypes.style,
    PropTypes.arrayOf([ViewPropTypes.style]),
  ]),
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.string,
  onChangeText: PropTypes.func,
  autoFocus: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  underlineColor: PropTypes.string,
  error: PropTypes.string,
};

export default Input;
