import React, { Component } from 'react';
import { Linking, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Surface, Portal } from 'react-native-paper';
import { connect } from 'react-redux';
import Intercom from "react-native-intercom";

// Components
import Text from '../../Components/Text';
import OrdersCreators from '../../Redux/OrdersRedux';
import BottomSheet from '../../Components/BottomSheet';
import HeaderButton from '../../Components/HeaderButton';
import Instructions from './Instructions';
import {
  formattedDeliveryDay,
  formattedDeliveryWindow,
} from '../../Lib/OrdersLib';

import images from '../../Themes/Images';

// Styles
import styles from './styles';

class PickedUpClothes extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      backtitle: `null`,
      title: 'Order Details',
      headerRight: (
        <HeaderButton
          source={images.overflow}
          style={styles.overflowButton}
          containerStyle={styles.overflowButtonContainer}
          onPress={() => {
            navigation.state.params.showOptionsBottomSheet();
          }}
        />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.optionsBottomSheet = React.createRef();

    this.state = {
      order: this.props.navigation.getParam(`order`),
      updateHamprIdStatusLoading: this.props.updateHamprIdStatusLoading,
    };
  }

  showOptionsBottomSheet = () => {
    this.optionsBottomSheet.current.launch();
  };

  componentDidMount() {
    this.props.navigation.setParams({
      showOptionsBottomSheet: this.showOptionsBottomSheet,
    });
  }

  componentDidUpdate(prevProps) {
    const { updatedOrder } = this.props;
    let state = {};

    if (
      updatedOrder &&
      updatedOrder.id === this.state.order.id &&
      updatedOrder != this.state.order
    ) {
      state.order = updatedOrder;
    }

    if (
      prevProps.updateHamprIdStatusLoading !=
      this.props.updateHamprIdStatusLoading
    ) {
      state.updateHamprIdStatusLoading = this.props.updateHamprIdStatusLoading;
    }

    if (Object.keys(state).length) {
      this.setState(state);
    }
  }

  handleStatusChange = (order, orderItem) => {
    const statusMap = {
      picked_up: `washing`,
      washing: `drying`,
      drying: `folding`,
      folding: `out_for_delivery`,
    };

    const nextStatus = statusMap[orderItem.status];
    if (!nextStatus) {
      return;
    }

    const orderId = order.id;
    const hamprId = orderItem.hamprId.replace(`hampr_`, ``);

    this.props.updateHamprStatus(orderId, hamprId, nextStatus);
  };

  render() {
    const { order } = this.state;

    const ImageWithText = ({ image, text, containerStyle = {}, onPress }) => (
      <View>
        <TouchableOpacity
          style={styles.imageAndTextContainer}
          onPress={onPress}>
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
              {order.customer.name} expects their order
            </Text>
            <Text style={styles.dateExpected}>
              {formattedDeliveryDay(order)} Between
            </Text>
            <Text style={styles.timeExpected}>
              {formattedDeliveryWindow(order)}
            </Text>

            {order.order_items.map(o => {
              return (
                <Surface style={styles.instructionsContainer}>
                  <Instructions
                    orderItem={o}
                    onStatusChangePress={() =>
                      this.handleStatusChange(order, o)
                    }
                    hamprIsLoading={
                      this.state.updateHamprIdStatusLoading[
                        `hampr_` + o.hamprId
                      ]
                    }
                  />
                </Surface>
              );
            })}
          </View>
        </ScrollView>

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
            </View>
          </BottomSheet>
        </Portal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    updatedOrder: state.orders.updatedHampr,
    updateHamprIdStatusLoading: state.orders.updateHamprIdStatusLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHamprStatus: (orderId, hamprId, status) =>
      dispatch(OrdersCreators.updateHamprStatus(orderId, hamprId, status)),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PickedUpClothes);

