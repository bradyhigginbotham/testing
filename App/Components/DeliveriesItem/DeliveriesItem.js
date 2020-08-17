import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import Text from '../Text';
import Card from '../Card';
import images from '../../Themes/Images';
import {
  formattedAddress,
  formattedDistanceToUser,
  formattedPickupWindow,
  formattedDeliveryWindow,
  customerFirstName,
} from '../../Lib/OrdersLib';

const DeliveriesItem = ({ item, onPress, userLocation, distance, showBorder = true }) => {
  const itemIsPickup = item.status === `claimed`;
  const address = formattedAddress(itemIsPickup ? item.pickup_address : item.delivery_address, true);
  const hamprCount = item.order_items ? item.order_items.length : 0;
  const hamprCountString = hamprCount + ` hampr` + (hamprCount != 1 ? `s` : ``);
  const calculatedDistance = distance ? `${distance.toFixed(1)} mi` : formattedDistanceToUser(itemIsPickup ? item.pickup_address : item.delivery_address, userLocation, true);
  const window = itemIsPickup ? formattedPickupWindow(item) : formattedDeliveryWindow(item);

  return (
    <Card
      showBorder={showBorder}
      backgroundItem={itemIsPickup && styles.cardBackgroundItem}
      containerStyle={styles.cardContainer}
      style={styles.card}
      onPress={onPress}>
      <View style={styles.leftSide}>
        <Text style={styles.name}>{item.customer.name}</Text>
        <Text style={styles.adress}>{address}</Text>
      </View>
      <View style={styles.rightSide}>
        <View style={styles.pickUpContainer}>
          {itemIsPickup ? <Image style={styles.pickUpImage} source={images.pickUp} /> : <Image style={styles.pickUpImage} source={images.drop} />}
          <Text style={styles.pickUpText} numberOfLines={1}>
            {itemIsPickup ? `pickup from` : `drop off to`} {customerFirstName(item)}
          </Text>
        </View>
        <Text style={styles.time} numberOfLines={1}>
          {window}
        </Text>
        <Text style={styles.hamprs} numberOfLines={1}>
          {calculatedDistance} • {hamprCountString}
        </Text>
      </View>
    </Card>
  );
};

export default DeliveriesItem;
