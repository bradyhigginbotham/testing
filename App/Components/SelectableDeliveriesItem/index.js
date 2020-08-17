import { View } from 'react-native';
import React from 'react';

import DeliveriesItem from '../DeliveriesItem';
import styles from './styles';
import { TouchableRipple } from 'react-native-paper';

const SelectableDeliveriesItem = ({ item, userLocation, onPress, selected }) => {
  return (
    <View
      style={styles.container}>
      <View style={styles.checkboxBorder}>
        <View style={selected ? styles.checkboxSelected : undefined} />
      </View>
      <View style={styles.deliveryItemContainer}>
        <DeliveriesItem item={item} userLocation={userLocation} />
      </View>
      <TouchableRipple onPress={onPress} style={styles.rippleButton}><View/></TouchableRipple>
    </View>
  );
};

export default SelectableDeliveriesItem;
