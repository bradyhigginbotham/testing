import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View, AppState, Platform, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Permissions, { PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

// Components

import OrderItem from '../../Components/OrderItem';
import Text from '../../Components/Text';
import LocationBlockedPlaceholder from '../../Components/LocationBlockedPlaceholder';
import colors from '../../Themes/Colors';
import styles from './styles';
import { fetchOrdersLoading } from '../../Redux/OrdersRedux';
import images from '../../Themes/Images';

const renderLoading = (
  <View>
    <ActivityIndicator size="large" color={colors.light_grey_green} style={styles.loading}/>
  </View>
);

const userIsMissingProfileInfo = (user) => {
  if (!user) {
    return false
  }
  
  const hasPopColor = user.pop_colors && user.pop_colors.length > 0;
  const hasProfilePicture =
    user.profile_picture && user.profile_picture.length > 0;
  const hasBio = user.bio && user.bio.length > 0;

  return !hasPopColor || !hasProfilePicture || !hasBio;
}

const OrdersScreen = ({ navigation, fetchOrders, claimOrder, orders, ordersLoading, setLocation, locationBlocked, setLocationBlocked, user }) => {

  const [hideCompleteProfile, setHideCompleteProfile] = useState(!userIsMissingProfileInfo(user));

  const fetchLocation = () => {
    
    if (!Geolocation) {
      return;
    }

    Geolocation.watchPosition(
      position => {
        const { coords } = position;
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      },
      error => {
        
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  };

  const checkLocationPermissions = nextAppState => {
    if (nextAppState === `active`) {
      Permissions.check(
        Platform.OS === `ios`
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      ).then(response => {
        if (response === RESULTS.BLOCKED) {
          setLocationBlocked(true)
        } else if (response === RESULTS.GRANTED) {
          fetchLocation();
          setLocationBlocked(false);
        } else {
          Permissions.request(
            Platform.OS === `ios`
              ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
              : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          ).then(response => {
            checkLocationPermissions(`active`);
          });
        }
      });
    }
  };
  
  useEffect(() => {
    AppState.addEventListener(`change`, checkLocationPermissions);
    checkLocationPermissions(`active`);
    fetchOrders();
  }, []);

  useEffect(() => {
    setHideCompleteProfile(hideCompleteProfile || !userIsMissingProfileInfo(user));
  }, [user])
  
  if (ordersLoading && !orders.length) {
    return renderLoading;
  }

  if (locationBlocked) {
    checkLocationPermissions(`active`);
    return <LocationBlockedPlaceholder />;
  }

  _renderEmptyState = () => {
    if (orders.length) {
      return null;
    }
    
    return (
      <Text style={styles.emptyState}>
        There are no orders available around you right now.{`\n`}Pull down to refresh and try again later.
      </Text>
    )
  }

  _renderCompleteProfile = () => {
    if (hideCompleteProfile) {
      return
    }

    return (
      <TouchableOpacity style={styles.completeProfileContainer} onPress={() => {
        navigation.navigate("EditProfile")
      }}>
        <TouchableOpacity onPress={() => setHideCompleteProfile(true)}>
          <Image source={images.closeWhite} style={styles.completeProfileClose}/>
        </TouchableOpacity>
        <Text style={styles.completeProfileText}>
          Complete your profile, you’re almost there!
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={orders}
        onRefresh={fetchOrders}
        refreshing={ordersLoading}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <OrderItem item={item} onConfirm={() => claimOrder(item)} />}
      />
      { _renderEmptyState() }
      { _renderCompleteProfile() }
    </View>
  );
};

OrdersScreen.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchOrders: PropTypes.func.isRequired,
  claimOrder: PropTypes.func.isRequired,
  ordersLoading: PropTypes.bool.isRequired,
};

OrdersScreen.defaultProps = {

}
export default OrdersScreen;
