import React from 'react';
import { View } from 'react-native';
import { Portal } from 'react-native-paper';
import PropTypes from 'prop-types';
import Text from '../Text';
import Button from '../Button';
import BottomSheet from '../BottomSheet';
import ScrollPicker from '../ScrollPicker';
import styles from './styles';

const OrderRadiusBottomsheet = ({ bottomsheet, setRadius }) => {
  const options = [
    {
      label: '5 Miles',
      value: 5,
    },
    {
      label: '10 Miles',
      value: 10,
    },
    {
      label: '15 Miles',
      value: 15,
    },
    {
      label: '20 Miles',
      value: 20,
    },
    {
      label: '25 Miles',
      value: 25,
    },
    {
      label: '30 Miles',
      value: 30,
    },
  ];

  const dataSource = options.map(opt => opt.label);
  return (
    <Portal>
      <BottomSheet ref={bottomsheet}>
        <View style={styles.bottomsheetContentContainer}>
          <Text style={styles.bottomTitle}>Select Your Order Radius</Text>
          <Text style={styles.bottomSubtitle}>
            Select a distance radius so we can show you the nearest orders.
          </Text>
          <ScrollPicker
            style={styles.scrollPicker}
            dataSource={dataSource}
            onValueChange={(_, i) => {
              if (options[i]) {
                setRadius(options[i].value);
              }
            }}
          />
          <Button
            title="Done"
            style={styles.startButton}
            containerStyle={styles.doneButtonContainer}
            onPress={() => bottomsheet.current.close()}
          />
        </View>
      </BottomSheet>
    </Portal>
  );
};

OrderRadiusBottomsheet.defaultProps = {
  setRadius: () => {},
};

OrderRadiusBottomsheet.propTypes = {
  setRadius: PropTypes.func,
  bottomsheet: PropTypes.string.isRequired,
};

export default OrderRadiusBottomsheet;
