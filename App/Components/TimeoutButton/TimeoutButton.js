import React, {useState} from 'react';
import {TouchableRipple} from 'react-native-paper';
import {View, Animated} from 'react-native';
import PropTypes from 'prop-types';

import NavigationService from '../../Services/NavigationService';

// Components
import Text from '../Text';
import Button from '../Button';

// Styles
import styles from '../../screens/OrdersScreen/styles';

const TimeoutButton = ({onConfirm, timeout, firstOrder, setFirstOrder}) => {
  const [activeButton, setActiveButton] = useState(false);
  const animatedValue = new Animated.Value(100);
  const animatedStyle = {width: animatedValue};

  const onAnimationEnd = () => {
    setActiveButton(!activeButton);
    animatedValue.setValue(100);
  };

  const handleFirstPress = () => {
    if (firstOrder) {
      NavigationService.navigate('FirstOrder');
      setFirstOrder();
    } else {
      setActiveButton(!activeButton);
    }
  };

  const handlePress = () => {
    setActiveButton(!activeButton);
    onConfirm();
  };

  if (activeButton) {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: timeout,
    }).start(onAnimationEnd);
  }

  return activeButton ? (
    <TouchableRipple
      borderless
      onPress={handlePress}
      style={styles.ripple}
      rippleColor="rgba(0, 0, 0, .1)">
      <View style={styles.timeoutButtonContainer}>
        <Animated.View style={[styles.timeOutLayer, animatedStyle]} />
        <Text style={styles.timeoutButtonTitleStyle}>CLAIM</Text>
      </View>
    </TouchableRipple>
  ) : (
    <Button
      title="CLAIM"
      style={styles.button}
      titleStyle={styles.titleStyle}
      containerStyle={styles.buttonContainer}
      onPress={handleFirstPress}
    />
  );
};

TimeoutButton.defaultProps = {
  onConfirm: () => {},
  timeout: 4000,
};

TimeoutButton.propTypes = {
  onConfirm: PropTypes.func,
  timeout: PropTypes.number,
  firstOrder: PropTypes.bool.isRequired,
  setFirstOrder: PropTypes.func.isRequired,
};

export default TimeoutButton;
