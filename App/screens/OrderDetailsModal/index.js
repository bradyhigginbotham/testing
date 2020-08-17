import React from 'react';
import { View, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { Surface, Portal } from 'react-native-paper';
import { Linking } from 'react-native'
import { connect } from 'react-redux';
import Intercom from 'react-native-intercom';

// Components
import Text from '../../Components/Text';
import Button from '../../Components/Button';
import BottomSheet from '../../Components/BottomSheet';
import HeaderButton from '../../Components/HeaderButton';
import NavigationService from '../../Services/NavigationService';
import ProgressModal from '../../Components/ProgressModal';

// Themes
import images from '../../Themes/Images';
import colors from '../../Themes/Colors';

// Lib
import {
  formattedPickupDay, 
  formattedPickupWindow,
  formattedDeliveryDay,
  formattedDeliveryWindow,
  formattedAddress,
} from '../../Lib/OrdersLib';
import OrdersCreators from '../../Redux/OrdersRedux'

// Styles
import styles from './styles';

class OrderDetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.optionsBottomSheet = React.createRef();
    this.rejectOrderBottomSheet = React.createRef();

    const order = this.props.navigation.getParam(`order`);
    this.state = {
      order,
      rejectOrderLoading: this.props.rejectOrderLoading,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Order Details',
      headerRight: (
        <HeaderButton
          source={images.overflow}
          style={styles.overflowButton}
          containerStyle={styles.overflowButtonContainer}
          onPress={() => navigation.state.params.showOptionsBottomSheet()}
        />
      ),
    };
  };

  showOptionsBottomSheet = () => {
    this.optionsBottomSheet.current.launch();
  };

  showRejectOrderBottomSheet = () => {
    this.rejectOrderBottomSheet.current.launch();
    this.optionsBottomSheet.current.close();
  };

  closeRejectOrderBottomSheet = () => {
    this.rejectOrderBottomSheet.current.close();
  };

  _pendingScanHamprs = updatedOrder => {
    let order = updatedOrder ? updatedOrder : this.state.order;
    return order.order_items.filter(oi => {
      return oi.status === undefined || oi.status === `out_for_delivery`;
    });
  };

  componentDidMount() {
    
    this.props.navigation.setParams({
      showOptionsBottomSheet: this.showOptionsBottomSheet,
      showRejectOrderBottomSheet: this.showRejectOrderBottomSheet,
      closeRejectOrderBottomSheet: this.closeRejectOrderBottomSheet,
    });
  }

  componentDidUpdate(prevProps) {
    const { updatedOrder, rejectOrderLoading } = this.props;

    let state = {}

    if (
      updatedOrder &&
      updatedOrder.id === this.state.order.id &&
      updatedOrder != this.state.order
    ) {
      const pendingScanHamprs = this._pendingScanHamprs(updatedOrder);

      if (!pendingScanHamprs.length) {
        this.props.navigation.goBack();
      }

      state = { ...state, ...{ order: updatedOrder } };
    }

    if (
      this.props.rejectOrderLoading != prevProps.rejectOrderLoading
    ) {
      state = { ...state, ...{ rejectOrderLoading: this.props.rejectOrderLoading } };
    }

    if (Object.keys(state).length > 0) {
      this.setState(state);
    }
  }

  _renderInstructions = (order, isPickup) => {
    const instructions = isPickup
      ? order.pickup_address.instructions
      : order.delivery_address.instructions;
    
    if (!instructions) {
      return;
    }

    return (
      <View style={styles.instructionsContainer}>
        <Text style={styles.title}>
          {isPickup ? `Pickup` : `Delivery`} Instructions
        </Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  };

  _renderOrderItems = order => {
    const OrderItem = ({ text, label, checked }) => (
      <Surface style={styles.surface}>
        <View style={styles.orderItemContainer}>
          <Text style={styles.title}>{text}</Text>
          <Text style={styles.scanText}>- {label}</Text>
        </View>
        {checked && <Text>✅</Text>}
      </Surface>
    );

    return (
      <View style={styles.orderContainer}>
        <Text style={styles.title}>Order</Text>
        {order.order_items.map(i => {
          return (
            <OrderItem
              text={i.label}
              label={i.hampr_scan_text}
              checked={i.status === `picked_up` || i.status === `delivered`}
            />
          );
        })}
      </View>
    );
  };

  render() {
    const { order } = this.state;
    const orderIsPickup = order.status === `claimed`;
    const windowDay = orderIsPickup
      ? formattedPickupDay(order)
      : formattedDeliveryDay(order);
    const windowTime = orderIsPickup
      ? formattedPickupWindow(order)
      : formattedDeliveryWindow(order);

    const ImageWithText = ({ image, text, containerStyle = {}, onPress }) => (
      <View>
        <TouchableOpacity style={styles.imageAndTextContainer} onPress={onPress}>
          <Surface style={[styles.bottomSheetImageContainer, containerStyle]}>
            <Image source={image} style={styles.bottomSheetImage} />
          </Surface>
        </TouchableOpacity>
        <Text style={styles.imageText}>{text}</Text>
      </View>
    );

    const BottomSheetOption = ({
      text,
      containerStyle,
      textStyle,
      onPress,
    }) => (
      <View style={[styles.defaultOption, containerStyle]}>
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.picker, textStyle]}>{text}</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.orderExpectedContainer}>
            <Text style={styles.clientExpected}>
              {order.customer.name} expects the{' '}
              {orderIsPickup ? `pick up` : `delivery`}
            </Text>
            <Text style={styles.dateExpected}>{windowDay} Between</Text>
            <Text style={styles.timeExpected}>{windowTime}</Text>
          </View>
          <View>
            <View style={styles.addresContainer}>
              <View>
                <Text style={styles.title}>
                  {orderIsPickup ? `Pickup` : `Delivery`} Address
                </Text>
                <Text style={styles.addres}>
                  {formattedAddress(
                    orderIsPickup
                      ? order.pickup_address
                      : order.delivery_address,
                    true,
                  )}
                </Text>
              </View>
            </View>
          </View>
          {this._renderInstructions(order, orderIsPickup)}
          {this._renderOrderItems(order)}
          <ProgressModal isVisible={this.state.rejectOrderLoading} />
        </ScrollView>

        {/* Options BottomSheet */}

        <Portal>
          <BottomSheet ref={this.optionsBottomSheet}>
            <View style={styles.bottomSheetContainer}>
              <Text style={styles.bottomTitle}>
                Contact {order.customer.name}
              </Text>
              <Text style={styles.bottomSubtitle}>{order.customer.phone}</Text>
              <View style={styles.imagesContainer}>
                <ImageWithText
                  image={images.call}
                  text="CALL"
                  onPress={() => {
                    if (
                      !order.customer.phone ||
                      order.customer.phone.length === 0
                    ) {
                      alert(`The customer doesn't have a phone number`);
                      return;
                    }

                    Linking.openURL(`tel:${order.customer.phone}`);
                  }}
                />
                <ImageWithText
                  image={images.text}
                  text="TEXT"
                  onPress={() => {
                    if (
                      !order.customer.phone ||
                      order.customer.phone.length === 0
                    ) {
                      alert(`The customer doesn't have a phone number`);
                      return;
                    }

                    Linking.openURL(`sms:${order.customer.phone}`);
                  }}
                />
              </View>
              <BottomSheetOption
                text="Contact Support"
                containerStyle={styles.contactSupport}
                onPress={() => {
                  Intercom.displayMessageComposer();
                }}
              />
              { order.status === `claimed` && 
                <BottomSheetOption
                  text="Reject Order"
                  onPress={() =>
                    this.props.navigation.state.params.showRejectOrderBottomSheet()
                  }
                  containerStyle={styles.rejectOrder}
                />
              }
            </View>
          </BottomSheet>
        </Portal>

        {/* Reject Order BottomSheet */}

        <Portal>
          <BottomSheet ref={this.rejectOrderBottomSheet}>
            <View style={styles.bottomSheetContainer}>
              <Text style={styles.rejectOrderTitle}>
                {'Are you sure you want to\nreject this order?'}
              </Text>
              <Text style={styles.rejectOrderSubtitle}>
                Rejecting too many orders can negatively affect your performance
                ratings and can result in poor ratings.{' '}
              </Text>
              <BottomSheetOption
                text="Reject Order"
                containerStyle={styles.contactSupport}
                textStyle={{ color: colors.pastel_red }}
                onPress={() => {
                  this.props.rejectOrder(this.state.order.id);
                  this.props.navigation.state.params.closeRejectOrderBottomSheet();
                }}
              />
              <BottomSheetOption
                text="Cancel"
                textStyle={{ color: colors.blue_grey }}
                onPress={() =>
                  this.props.navigation.state.params.closeRejectOrderBottomSheet()
                }
              />
            </View>
          </BottomSheet>
        </Portal>

        <Button
          title={'Scan To ' + (orderIsPickup ? `Pick Up` : `Drop Off`)}
          image={require('../../Images/scan-white.png')}
          containerStyle={styles.startButtonContainer}
          onPress={() => {
            NavigationService.navigate('Scan', { order });
          }}
        />
      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
    updatedOrder: state.orders.updatedHampr,
    rejectOrderLoading: state.orders.rejectOrderLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    rejectOrder: orderId =>
      dispatch(OrdersCreators.rejectOrder(orderId)),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailsModal);