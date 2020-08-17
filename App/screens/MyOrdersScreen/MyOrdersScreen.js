import React, { useEffect } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../../Components/Text';
import Button from '../../Components/Button';
import DeliveriesItem from '../../Components/DeliveriesItem';

import colors from '../../Themes/Colors';
import styles from './styles';

const renderLoading = (
  <View>
    <ActivityIndicator
      size="large"
      color={colors.light_grey_green}
      style={styles.loading}
    />
  </View>
);

const MyOrdersScreen = ({
  fetchDeliveryOrders,
  deliveryOrders,
  deliveryOrdersLoading,
  route,
  recoverRoute,
  navigation,
  userLocation,
}) => {
  
  const handlePlanRoute = () => {
    if (!deliveryOrders || !deliveryOrders.length) {
      return;
    }
    navigation.navigate(`PlanRoute`, {deliveryOrders});
  };

  const handleResumeRoute = () => {
    if (!deliveryOrders || !deliveryOrders.length) {
      return;
    }
    navigation.navigate(`Route`);
  };

  useEffect(() => {
    if (!deliveryOrders.length && !deliveryOrdersLoading) {
      fetchDeliveryOrders();
    }

    recoverRoute();
  }, []);

  _routeIsValid = () => {
    const deliveryIds = deliveryOrders.map(o => o.id);

    if (!route || !route.route) {
      return false;
    }

    const existingRouteDeliveries = route.route.filter(d =>
      deliveryIds.includes(d.id)
    );

    let deliveryTypeIsWrong = false;

    existingRouteDeliveries.forEach(d => {
      const delivery = deliveryOrders.find(order => order.id === d.id);
      if (delivery.status !== d.item.status) {
        deliveryTypeIsWrong = true;
      }
    });

    return !deliveryTypeIsWrong && existingRouteDeliveries.length > 0;
  }

  _renderRouteTwinButtons = () => {
    if (!route) {
      return null;
    }

    if (!deliveryOrders.length) {
      return null;
    }

    if (!_routeIsValid()) {
      return null;
    }

    return (
      <View style={styles.twinButtonsFooter}>
        <Button
          title="Resume Route"
          titleStyle={styles.startButtonTitleStyle}
          containerStyle={styles.twinButtonContainer}
          onPress={handleResumeRoute}
        />
        <Button
          title="New Route"
          titleStyle={styles.startButtonTitleStyle}
          containerStyle={styles.twinButtonContainer}
          onPress={handlePlanRoute}
        />
      </View>
    );
  }

  _renderPlanRouteButton = () => {
    if (!deliveryOrders.length) {
      return null;
    }

    if (route && _routeIsValid()) {
      return null;
    }

    return (
      <Button
        title="Plan Route"
        titleStyle={styles.startButtonTitleStyle}
        containerStyle={styles.startButtonContainer}
        onPress={handlePlanRoute}
      />
    );
  };

  _renderEmptyState = () => {
    if (deliveryOrders.length) {
      return null;
    }

    return (
      <Text style={styles.emptyState}>
        You have no orders ready for pickup or dropoff right now.{`\n`}Claim
        some new ones.
      </Text>
    );
  };

  if (deliveryOrdersLoading && !deliveryOrders.length) {
    return renderLoading;
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={deliveryOrders}
        onRefresh={fetchDeliveryOrders}
        refreshing={deliveryOrdersLoading}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <DeliveriesItem
            item={item}
            userLocation={userLocation}
            onPress={() => navigation.navigate('OrderDetails', { order: item })}
          />
        )}
      />
      {_renderEmptyState()}
      {_renderPlanRouteButton()}
      {_renderRouteTwinButtons()}
    </View>
  );
};

MyOrdersScreen.propTypes = {
  fetchDeliveryOrders: PropTypes.func.isRequired,
  route: PropTypes.shape({}),
  recoverRoute: PropTypes.func.isRequired,
  deliveryOrders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deliveryOrdersLoading: PropTypes.bool.isRequired,
  userLocation: PropTypes.shape({}),
};

export default MyOrdersScreen;
