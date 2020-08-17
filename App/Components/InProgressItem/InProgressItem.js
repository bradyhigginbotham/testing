import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { formattedDeliveryDay, formattedDeliveryWindow } from '../../Lib/OrdersLib';
// Components
import Text from '../Text';
import Card from '../Card';

// Styles
import styles from './styles';

const calculateProgressForStatus = (orderItems, status, statusText) => {
  const filtered = orderItems.filter(o => o.status === status);
  
  if (filtered.length) {
    return filtered.length + ` of ` + orderItems.length + ` ` + statusText;
  } else {
    return undefined;
  }
}

const calculateProgress = (orderItems) => {
  return calculateProgressForStatus(orderItems, `out_for_delivery`, `folded`) ||
    calculateProgressForStatus(orderItems, `folding`, `dried`) ||
    calculateProgressForStatus(orderItems, `drying`, `washed`) ||
    (`0 of ` + orderItems.length + ` washed`);
}

const InProgressItem = ({
  onPress,
  item,
}) => {

  const customerName = item.customer.name;
  const progressText = calculateProgress(item.order_items);
  const expected = `expected ` + formattedDeliveryDay(item);
  const timeExpected = formattedDeliveryWindow(item);

  return (
    <Card showBorder containerStyle={styles.cardContainer} onPress={onPress} style={styles.card}>
      <View style={styles.leftSide}>
        <Text style={styles.consumerName}>{customerName}</Text>
        <Text style={styles.pickedUp}>{progressText}</Text>
      </View>
      <View style={styles.rightSide}>
        <Text style={styles.dayExpected}>{expected}</Text>
        <Text style={styles.timeExpected}>{timeExpected}</Text>
      </View>
    </Card>
  );
}

InProgressItem.defaultProps = {
  onPress: () => {},
};

InProgressItem.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.shape({}),
};

export default InProgressItem;
