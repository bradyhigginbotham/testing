import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import DeviceInfo from 'react-native-device-info';

import OrdersCreators from '../../Redux/OrdersRedux';
import Button from '../../Components/Button';
import images from '../../Themes/Images';
import styles from './styles';
import eventEmitter from '../../Services/EventEmitter';
import ProgressModal from '../../Components/ProgressModal';

class ScanModal extends Component {
  static navigationOptions = ({ navigation }) => {
    const order = navigation.getParam(`order`);
    const pendingScanHamprs = order.order_items.filter(oi => {
      return oi.status === undefined || oi.status === `out_for_delivery`;
    }).length;

    const totalHamprs = order.order_items.length;
    const hamprIndex = totalHamprs - pendingScanHamprs + 1;

    return {
      title: `Scanning Hampr ` + hamprIndex + ` of ` + totalHamprs,
    };
  };

  constructor(props) {
    super(props);
    this.camera = React.createRef();

    this.state = {
      order: this.props.navigation.getParam(`order`),
    };
  }

  _pendingScanHamprs = updatedOrder => {
    let order = updatedOrder ? updatedOrder : this.state.order;
    return order.order_items.filter(oi => {
      return oi.status === undefined || oi.status === `out_for_delivery`;
    });
  };

  simulateScan = () => {
    const pendingScanHamprs = this._pendingScanHamprs();

    if (!pendingScanHamprs.length) {
      return;
    }

    const hampr = pendingScanHamprs[0];

    let data = `1`;
    data += `|` + hampr.hampr_scan_text;
    data += `|` + hampr.hamprId.replace(`hampr_`, ``);

    this.handleBarCode({ data });
  };

  handleBarCode = ({ data }) => {
    if (data) {
      const dataSplit = data.split(`|`);
      const hamprId = dataSplit[dataSplit.length - 1];
      const isPickup = this.state.order.status === `claimed`;
      this.props.updateHamprStatus(this.state.order.id, hamprId, isPickup);
    }
  };

  componentDidMount() {
    if (!this._pendingScanHamprs().length) {
      eventEmitter.emit(
        `showNotification`,
        `You've already picked up this order`,
      );
      this.props.navigation.goBack();
    }
  }

  componentDidUpdate(prevProps) {
    const { updatedOrder, updateHamprStatusLoading } = this.props;

    if (
      updatedOrder &&
      updatedOrder.id === this.state.order.id &&
      updatedOrder != this.state.order
    ) {
      const pendingScanHamprs = this._pendingScanHamprs(updatedOrder);

      if (!pendingScanHamprs.length) {
        if (updatedOrder.status === `picked_up`) {
          eventEmitter.emit(
            `showNotification`,
            `You've successfully picked up this order 🙌`,
          );
        } else {
          eventEmitter.emit(
            `showNotification`,
            `You've successfully dropped off this order 🙌`,
          );
        }
        
        this.props.navigation.goBack();
      }

      this.setState({ order: updatedOrder });
      this.props.navigation.setParams({
        order: updatedOrder,
      });
    }

    if (this.state.updateHamprStatusLoading != updateHamprStatusLoading) {
      this.setState({updateHamprStatusLoading});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />

        {!this.state.updateHamprStatusLoading && (
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
            onBarCodeRead={
              this.state.updateHamprStatusLoading ? null : this.handleBarCode
            }
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          />
        )}

        <View style={styles.overlay}>
          <Image style={styles.qrScanner} source={images.qrOverlay} />
        </View>

        {DeviceInfo.isEmulatorSync() && (
          <Button
            title="Simulate Scan"
            containerStyle={styles.simulateButton}
            onPress={this.simulateScan}
          />
        )}

        <ProgressModal isVisible={this.state.updateHamprStatusLoading} />
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    updatedOrder: state.orders.updatedHampr,
    updateHamprStatusLoading: state.orders.updateHamprStatusLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHamprStatus: (orderId, hamprId, isPickup) =>
      dispatch(
        OrdersCreators.updateHamprStatus(
          orderId,
          hamprId,
          isPickup ? `picked_up` : `delivered`,
        ),
      ),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScanModal);