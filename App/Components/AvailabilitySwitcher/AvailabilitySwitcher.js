import React from 'react';
import { Switch } from 'react-native-paper';
import PropTypes from 'prop-types';
import colors from '../../Themes/Colors';
import styles from './styles';

const AvailabilitySwitcher = ({ available, setAvailability }) => (
  <Switch
    style={styles.switch}
    color={available ? colors.pale_teal : colors.blue_grey}
    ios_backgroundColor={colors.blue_grey}
    value={available}
    onValueChange={() => setAvailability(!available)}
  />
);

AvailabilitySwitcher.propTypes = {
  available: PropTypes.bool.isRequired,
  setAvailability: PropTypes.func.isRequired,
};

export default AvailabilitySwitcher;
