import React from 'react';
import { Surface } from 'react-native-paper';
import PropTypes from 'prop-types';
import Text from '../Text';
import styles from './styles';

const Notification = ({ text }) => (
  <Surface style={styles.container}>
    <Text style={styles.title}>{text}</Text>
  </Surface>
);

Notification.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Notification;
