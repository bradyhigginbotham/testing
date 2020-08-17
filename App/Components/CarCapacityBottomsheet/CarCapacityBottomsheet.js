import React from 'react';
import { View } from 'react-native';
import { Portal } from 'react-native-paper';
import PropTypes from 'prop-types';
import Text from '../Text';
import Button from '../Button';
import BottomSheet from '../BottomSheet';
import ScrollPicker from '../ScrollPicker';
import styles from './styles';

const CarCapacityBottomsheet = ({ bottomsheet, setCapacity, handleSetCapacity }) => {
  const options = [
    {
      label: 'No Limit',
      value: 'No Limit',
    },
    {
      label: '5 hamprs',
      value: 5,
    },
    {
      label: '6 hamprs',
      value: 6,
    },
    {
      label: '7 hamprs',
      value: 7,
    },
    {
      label: '8 hamprs',
      value: 8,
    },
  ];
  const dataSource = options.map(opt => opt.label);
  return (
    <Portal>
      <BottomSheet ref={bottomsheet}>
        <View style={styles.bottomsheetContentContainer}>
          <Text style={styles.bottomTitle}>Is your car large enough?</Text>
          <Text style={styles.bottomSubtitle}>
            If you have limited vehicle space, set a limit so we can remind you. Update your limit
            anytime in your preferences.
          </Text>
          <ScrollPicker
            style={styles.scrollPicker}
            dataSource={dataSource}
            onValueChange={(_, i) => {
              if (options[i]) {
                const value = options[i].value;

                if (handleSetCapacity) {
                  handleSetCapacity(value)
                } else {
                  setCapacity(value);
                }
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

CarCapacityBottomsheet.defaultProps = {
  setCapacity: () => {},
  handleSetCapacity: undefined,
};

CarCapacityBottomsheet.propTypes = {
  setCapacity: PropTypes.func,
  handleSetCapacity: PropTypes.func,
  bottomsheet: PropTypes.string.isRequired,
};

export default CarCapacityBottomsheet;
