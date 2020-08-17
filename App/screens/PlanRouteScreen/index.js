import React, { Component, createRef } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';

import { RippleButton } from '../ProfileScreen/ProfileScreen';
import SelectableDeliveriesItem from '../../Components/SelectableDeliveriesItem';
import CarCapacityBottomsheet from '../../Components/CarCapacityBottomsheet';
import Button from '../../Components/Button';
import Text from '../../Components/Text';
import styles from './styles';
import RoutesCreators from '../../Redux/RoutesRedux';
import { LocationSelectors } from '../../Redux/LocationRedux';

class PlanRouteScreen extends Component {
  static navigationOptions = ({ navigation }) => {};

  constructor(props) {
    super(props);

    const deliveryOrders = this.props.navigation.getParam(`deliveryOrders`);
    const carCapacity = this.props.carCapacity ? this.props.carCapacity : 6;

    this.state = { deliveryOrders, selectedOrders: [], carCapacity};

    this.carCapacityBottomsheet = createRef(null);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.route && (!prevProps.route || (this.props.route.routeId !== prevProps.route.routeId))) {
      this.props.navigation.replace(`Route`);
    }

    if (this.props.getRouteLoading != prevProps.getRouteLoading) {
      this.setState({getRouteLoading: this.props.getRouteLoading});
    }
  }

  _renderCarCapacitySelector = () => {
    return (
      <RippleButton onPress={() => {this.carCapacityBottomsheet.current.launch()}}>
        <View style={styles.optionContainer}>
          <Text style={styles.leftText}>Car Capacity</Text>
          <Text style={styles.rightText}>{this.state.carCapacity}</Text>
        </View>
        <View style={styles.separator}/>
      </RippleButton>
    );
  }

  _renderPlanRouteButton = () => {
    if (!this.state.selectedOrders.length) {
      return null;
    }

    return (
      <Button
        title="Plan Route"
        style={styles.startButton}
        titleStyle={styles.startButtonTitleStyle}
        containerStyle={styles.startButtonContainer}
        loading={this.state.getRouteLoading}
        onPress={() => {
          this.props.getRoute(this.state.carCapacity, this.state.selectedOrders);
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            `select-car-capacity`,
            `instructions`,
            ...this.state.deliveryOrders,
          ]}
          keyExtractor={item => (item.id ? item.id.toString() : item)}
          renderItem={({ item }) => {
            if (item === `select-car-capacity`) {
              return this._renderCarCapacitySelector();
            } else if (item === `instructions`) {
              return (
                <View>
                  <Text style={styles.instructionsText}>
                    Select the orders you'd like to pickup / drop off
                  </Text>
                </View>
              );
            } else {
              return (
                <SelectableDeliveriesItem
                  item={item}
                  userLocation={this.props.userLocation}
                  selected={this.state.selectedOrders.includes(item)}
                  onPress={() => {
                    if (this.state.selectedOrders.includes(item)) {
                      this.setState({
                        selectedOrders: this.state.selectedOrders.filter(
                          so => so !== item,
                        ),
                      });
                    } else {
                      this.setState({
                        selectedOrders: [item, ...this.state.selectedOrders],
                      });
                    }
                  }}
                />
              );
            }
          }}
        />
        {this._renderPlanRouteButton()}
        <CarCapacityBottomsheet
          bottomsheet={this.carCapacityBottomsheet}
          handleSetCapacity={capacity =>
            this.setState({ carCapacity: capacity })
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLocation: LocationSelectors.selectEffectiveLocation(state),
    carCapacity: state.preferences.carCapacity,
    getRouteLoading: state.routes.getRouteLoading,
    route: state.routes.route,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRoute: (vehicleCapacity, orders) =>
      dispatch(RoutesCreators.getRoute(vehicleCapacity, orders)),
    resetRoute: () =>
      dispatch(RoutesCreators.resetRoute()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlanRouteScreen);
