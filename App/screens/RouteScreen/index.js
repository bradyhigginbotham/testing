import React, { Component } from 'react';
import { FlatList, View, Linking } from 'react-native';
import { connect, select } from 'react-redux';
import { showLocation } from 'react-native-map-link';

import RouteDeliveriesItem from '../../Components/RouteDeliveriesItem';
import Button from '../../Components/Button';
import Text from '../../Components/Text';
import styles from './styles';
import RoutesCreators from '../../Redux/RoutesRedux';
import { isNumericLiteral } from '@babel/types';
import { LocationSelectors } from '../../Redux/LocationRedux';

class RouteScreen extends Component {
  static navigationOptions = ({ navigation }) => {};

  constructor(props) {
    super(props);
    
    const {deliveryOrders} = this.props;

    this.state = { deliveryOrders };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.deliveryOrders !== this.props.deliveryOrders) {
      this.setState({deliveryOrders: this.props.deliveryOrders});
    }
  }

  _firstAvailableDestination = () => {
    const routes = this.props.route.route;
    
    if (!routes) {
      return null;
    }
    
    for (const route of routes) {
      const deliveryOrder = this.state.deliveryOrders.find(o => o.id === route.id);
      if (deliveryOrder) {
        return route;
      }
    }
      
    return null;
  }

  _renderStartDrivingButton = () => {

    if (!this._firstAvailableDestination()) {
      return;
    }

    return (
      <Button
        title="Start Driving"
        style={styles.startButton}
        titleStyle={styles.startButtonTitleStyle}
        containerStyle={styles.startButtonContainer}
        onPress={() => {

          const nextDestination = this._firstAvailableDestination();

          if (!nextDestination) {
            return;
          }
          
          const nextItem = nextDestination.item;
          const {defaultMapApp} = this.props;

          let showLocationOptions = {
            latitude: nextDestination.coordinates.lat,
            longitude: nextDestination.coordinates.lon,
            title: nextItem.customer.name,
            googleForceLatLon: true,
            appsWhiteList: [`google-maps`, `waze`, `apple-maps`],
          };

          let link;
          let appName;

          switch (defaultMapApp) {
            case `Google Maps`:
              link = `comgooglemaps://`;
              appName = `google-maps`;
              break;
            case `Apple Maps`:
              link = `applemaps://`;
              appName = `apple-maps`;
              break;
            case `Waze`:
              link = `waze://`;
              appName = `waze`;
              break;
          }

          if (link) {
            Linking.canOpenURL(link)
              .then(result => {
                if (result) {
                  showLocationOptions.app = appName;
                }
              })
              .finally(() => {
                showLocation(showLocationOptions);
              });
          } else {
            showLocation(showLocationOptions);
          }
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={this.props.route.route}
          keyExtractor={destination => destination.id}
          renderItem={({ item }) => {
            const indexOfItem = this.props.route.route.indexOf(item);
            const isLastItem = this.props.route.route.length == indexOfItem + 1;
            const isFirstItem = indexOfItem === 0;

            let nextIsPickup = false;
            let nextIsEnabled = false;

            if (!isLastItem) {
              const nextItem = this.props.route.route[indexOfItem + 1];
              const nextDeliveryOrder = this.state.deliveryOrders.find(o => o.id === nextItem.id,);
              nextIsPickup = nextItem.type === `pickup`;
              nextIsEnabled = nextDeliveryOrder != undefined;
            }

            const deliveryOrder = this.state.deliveryOrders.find(o => o.id === item.id);
            
            return (
              <RouteDeliveriesItem
                destination={item}
                deliveryOrder={deliveryOrder}
                nextIsPickup={nextIsPickup}
                nextIsEnabled={nextIsEnabled}
                isFirstItem={isFirstItem}
                isLastItem={isLastItem}
                userLocation={this.props.userLocation}
                onPress={() => {
                  if (deliveryOrder) {
                    this.props.navigation.navigate('OrderDetails', {
                      order: deliveryOrder,
                    });
                  }
                }}
              />
            );
          }}
        />
        {this._renderStartDrivingButton()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    deliveryOrders: state.orders.deliveryOrdersList,
    defaultMapApp: state.preferences.defaultMapApp,
    userLocation: LocationSelectors.selectEffectiveLocation(state),
    route: state.routes.route,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouteScreen);
