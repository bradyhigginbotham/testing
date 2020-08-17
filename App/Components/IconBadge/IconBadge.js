import React from 'react';
import { View, Image } from 'react-native';
import { Badge } from 'react-native-paper';
import styles from './styles';
import images from '../../Themes/Images';

const IconBadge = ({ focused, deliveryOrders }) => (
  <>
    <Image source={images[`myOrders${focused ? '' : 'Unselected'}`]} />
    {deliveryOrders > 0 && (
      <View style={styles.badgeContainer}>
        <Badge size={14} style={styles.badge}>
          {deliveryOrders}
        </Badge>
      </View>
    )}
  </>
);

export default IconBadge;
