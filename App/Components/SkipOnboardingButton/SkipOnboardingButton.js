import React from 'react';
import PropTypes from 'prop-types';
import HeaderButton from '../HeaderButton';
import styles from './styles';

const SkipOnboardingButton = ({ setFirstTime, navigation }) => (
  <HeaderButton
    title="SKIP"
    style={styles.title}
    onPress={() => {
      setFirstTime(false);
      navigation.navigate('Auth');
    }}
  />
);

SkipOnboardingButton.propTypes = {
  setFirstTime: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SkipOnboardingButton;
