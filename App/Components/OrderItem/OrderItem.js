import React, { useRef } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';
import Card from '../Card';
import TimeoutButton from '../TimeoutButton';
import styles from './styles';
import CarCapacityBottomsheet from '../CarCapacityBottomsheet';
import { formattedPickupWindow, formattedHamprCount, formattedDistanceToUser, formattedPickupDay } from '../../Lib/OrdersLib';

const OrderItem = ({ item, onConfirm, carCapacity, userLocation }) => {
  const bottomsheet = useRef(null);

  const handleConfirm = () => {
    if (!carCapacity) {
      bottomsheet.current.launch();
    } else {
      onConfirm();
    }
  };

  return (
    <Card
      containerStyle={styles.cardContainer}
      style={styles.card}
    >
      <View style={styles.leftSide}>
        <Text style={styles.date}>{formattedPickupDay(item)}</Text>
        <Text style={styles.time}>{formattedPickupWindow(item)}</Text>
        <Text style={styles.distance}>{formattedDistanceToUser(item, userLocation)}</Text>
      </View>
      <View style={styles.rightSide}>
        <TimeoutButton onConfirm={handleConfirm} timeout={4000} />
        <Text style={styles.hamprs}>{formattedHamprCount(item)}</Text>
      </View>
      <CarCapacityBottomsheet bottomsheet={bottomsheet} />
    </Card>
  );
};

OrderItem.defaultProps = {
  onConfirm: () => {},
  carCapacity: 'No Limit',
};

OrderItem.propTypes = {
  onConfirm: PropTypes.func,
  item: PropTypes.shape({}).isRequired,
  carCapacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  userLocation: PropTypes.shape({}),
};

export default OrderItem;
