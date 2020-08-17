import { View } from 'react-native';
import React from 'react';
import { TouchableRipple } from 'react-native-paper';

import DeliveriesItem from '../DeliveriesItem';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../Themes/Colors';

const RouteDeliveriesItem = ({
  destination,
  nextIsPickup,
  nextIsEnabled,
  deliveryOrder,
  isFirstItem,
  isLastItem,
  userLocation,
  onPress,
}) => {

  let circleBorderStyle = styles.checkboxBorderGray;
  let circleContentStyle = styles.grayBackground;
  let leadingLineStyle = [styles.lineGray, {bottom: `50%`}];

  if (deliveryOrder) {
    circleBorderStyle =
      destination.type === `pickup`
        ? styles.checkboxBorderOrange
        : styles.checkboxBorderBlue;
      
    circleContentStyle =
      destination.type === `pickup`
        ? styles.orangeBackground
        : styles.blueBackground;

    leadingLineStyle = [
      destination.type === `pickup` ? styles.lineOrange : styles.lineBlue,
      { bottom: `50%` },
    ];
  }
  
  const renderTrailingLine = () => {
    if (isLastItem) {
      return;
    }

    let lineStyle = [styles.lineGray, { top: `50%` }];

    if (nextIsEnabled) {
      lineStyle = [
        nextIsPickup ? styles.lineOrange : styles.lineBlue,
        { top: `50%` },
      ];
    }

    return <View style={lineStyle} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.routeGraphicContainer}>
        <View style={leadingLineStyle} />
        <View style={[styles.checkboxBorder, circleBorderStyle]}>
          <View style={circleContentStyle} />
        </View>
        {renderTrailingLine()}
      </View>
      <View style={styles.deliveryItemContainer}>
        <DeliveriesItem
          item={destination.item}
          userLocation={userLocation}
          distance={!isFirstItem ? destination.distance : undefined}
          showBorder={deliveryOrder != undefined}
        />
      </View>
      <TouchableRipple onPress={onPress} style={styles.rippleButton}>
        <View />
      </TouchableRipple>
    </View>
  );
};

export default RouteDeliveriesItem;
