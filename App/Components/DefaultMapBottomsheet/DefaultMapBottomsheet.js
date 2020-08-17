import React from 'react';
import { View, FlatList } from 'react-native';
import { Portal } from 'react-native-paper';
import PropTypes from 'prop-types';
import Text from '../Text';
import BottomSheet from '../BottomSheet';
import styles from './styles';
import SeparatorLine from '../SeparatorLine';
import { RippleButton } from '../../screens/ProfileScreen/ProfileScreen';

const DefaultMapOption = ({ onPress, text }) => (
  <RippleButton onPress={onPress} style={styles.defaultMapOptionContainer}>
    <Text style={styles.text}>{text}</Text>
  </RippleButton>
);

const DefaultMapBottomsheet = ({ bottomsheet, setDefaultMapApp }) => {
  const options = [
    {
      label: 'Waze',
    },
    {
      label: 'Google Maps',
    },
    {
      label: 'Apple Maps',
    },
  ];

  const handlePress = (bottomsheet, label) => {
    setDefaultMapApp(label);
    bottomsheet.current.close();
  };

  return (
    <Portal>
      <BottomSheet ref={bottomsheet}>
        <View style={styles.bottomsheetContentContainer}>
          <View>
            <Text style={styles.bottomTitle}>Select Your Default Map App</Text>
            <Text style={styles.bottomSubtitle}>
              Choose which mapping application you would you to use for your orders.
            </Text>
          </View>
          <FlatList
            data={options}
            contentContainerStyle={styles.contentContainer}
            ItemSeparatorComponent={() => <SeparatorLine />}
            renderItem={({ item }) => (
              <DefaultMapOption
                item={item}
                text={item.label}
                onPress={() => handlePress(bottomsheet, item.label)}
              />
            )}
          />
        </View>
      </BottomSheet>
    </Portal>
  );
};

DefaultMapBottomsheet.defaultProps = {
  setCapacity: () => {},
};

DefaultMapBottomsheet.propTypes = {
  setCapacity: PropTypes.func,
  bottomsheet: PropTypes.string.isRequired,
};

export default DefaultMapBottomsheet;
