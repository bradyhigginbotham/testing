import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import CarCapacityBottomsheet from '../../Components/CarCapacityBottomsheet';
import OrderRadiusBottomsheet from '../../Components/OrderRadiusBottomsheet';
import DefaultMapBottomsheet from '../../Components/DefaultMapBottomsheet';
import Text from '../../Components/Text';
import SeparatorLine from '../../Components/SeparatorLine';
import styles from './styles';
import { RippleButton } from '../ProfileScreen/ProfileScreen';

const Option = ({ onPress, leftText, rightText }) => (
  <RippleButton onPress={onPress}>
    <View style={styles.optionContainer}>
      <Text style={styles.leftText}>{leftText}</Text>
      <Text style={styles.rightText}>{rightText}</Text>
    </View>
  </RippleButton>
);

const PreferencesScreen = ({ carCapacity, defaultMapApp, radius }) => {
  const mapsBottomsheet = useRef(null);
  const carCapacityBottomsheet = useRef(null);
  const orderRadiusBottomsheet = useRef(null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navigation}>
        <Text style={styles.sectionTitle}>navigation</Text>
        <Option
          leftText="Default Maps"
          rightText={defaultMapApp}
          onPress={() => mapsBottomsheet.current.launch()}
        />
        <Option
          leftText="Order Radius"
          rightText={`${radius} Mi.`}
          onPress={() => orderRadiusBottomsheet.current.launch()}
        />
      </View>
      <SeparatorLine style={styles.separatorLine} />
      <View style={styles.orders}>
        <Text style={styles.sectionTitle}>orders</Text>
        <Option
          onPress={() => carCapacityBottomsheet.current.launch()}
          leftText="hampr Capacity"
          rightText={carCapacity}
        />
      </View>
      <DefaultMapBottomsheet bottomsheet={mapsBottomsheet} />
      <OrderRadiusBottomsheet bottomsheet={orderRadiusBottomsheet} />
      <CarCapacityBottomsheet bottomsheet={carCapacityBottomsheet} />
    </ScrollView>
  );
};

Option.defaultProps = {
  leftText: '',
  rightText: '',
  onPress: () => {},
};

Option.propTypes = {
  leftText: PropTypes.string,
  rightText: PropTypes.string,
  onPress: PropTypes.func,
};

PreferencesScreen.defaultProps = {
  carCapacity: 'No Limit',
  defaultMapApp: 'Google Maps',
  radius: '15',
};

PreferencesScreen.propTypes = {
  carCapacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultMapApp: PropTypes.string,
  radius: PropTypes.number,
};

export default PreferencesScreen;
