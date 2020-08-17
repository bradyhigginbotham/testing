import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
  Platform,
  Keyboard
} from "react-native";
import PropTypes from "prop-types";
import Interactable from "react-native-interactable";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from "./styles";

const Screen = {
  width: Dimensions.get(`screen`).width,
  maxHeight: Dimensions.get(`screen`).height
};

const propTypes = {
  bodyStyle: PropTypes.shape({}),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  initialExpansionSize: PropTypes.number,
  hasKeyboard: PropTypes.bool,
  onClose: PropTypes.func
};

const defaultProps = {
  bodyStyle: {},
  children: undefined,
  initialExpansionSize: undefined,
  hasKeyboard: false,
  onClose: () => {}
};

class BottomSheet extends Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(Screen.maxHeight, {
      useNativeDriver: true
    });
    this.bottomSheet = React.createRef();

    this.state = {
      bottomSheetVisibility: false,
      bottomSheetHeight: 0,
      snapPointId: 0,
      keyboardHeight: 0
    };
  }

  componentDidMount() {
    if (this.props.hasKeyboard) {
      if (Platform.OS === `android`) {
        this.keyboardDidShowListener = Keyboard.addListener(
          `keyboardDidShow`,
          this._keyboardDidShow
        );
      } else {
        this.keyboardWillShowListener = Keyboard.addListener(
          `keyboardWillShow`,
          this._keyboardWillShow
        );
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.snapPointId === 0 && this.state.snapPointId === 1) {
      this.launch();
    }
  }

  componentWillUnmount() {
    if (this.props.hasKeyboard) {
      if (Platform.OS === `android`) {
        this.keyboardDidShowListener.remove();
      } else {
        this.keyboardWillShowListener.remove();
      }
    }
  }

  _keyboardDidShow = e => {
    if (
      this.state.keyboardHeight !== e.endCoordinates.height &&
      this.state.bottomSheetVisibility
    ) {
      this.setState({
        keyboardHeight: e.endCoordinates.height
      });
      this.launch();
    }
  };

  _keyboardWillShow = e => {
    if (
      this.state.keyboardHeight !== e.endCoordinates.height &&
      this.state.bottomSheetVisibility
    ) {
      this.setState({
        keyboardHeight: e.endCoordinates.height
      });
      this.launch();
    }
  };

  getSnapPoints() {
    let { initialExpansionSize, hasKeyboard } = this.props;
    let snapPoints = [{ y: Screen.maxHeight }];

    if (hasKeyboard) {
      let offset = 0;
      if (Platform.OS === `android`) {
        offset = 52;
      }

      snapPoints.push({
        y:
          Screen.maxHeight -
          this.state.bottomSheetHeight -
          this.state.keyboardHeight -
          offset
      });
    } else {
      let bottomSheetHeight = this.state.bottomSheetHeight;

      if (initialExpansionSize) {
        snapPoints.push({ y: Screen.maxHeight * (1 - initialExpansionSize) });
        snapPoints.push({ y: Screen.maxHeight * 0.01 });
      } else if (bottomSheetHeight < Screen.maxHeight * 0.99) {
        snapPoints.push({
          y: Screen.maxHeight - bottomSheetHeight - (Platform.OS === `android` ? 52 : 0) 
        });
      }

      if (bottomSheetHeight > Screen.maxHeight) {
        snapPoints.push({ y: Screen.maxHeight * 0.01 });
        let snapPointHeight = 0;
        while (snapPointHeight > Screen.maxHeight - bottomSheetHeight) {
          snapPointHeight = snapPointHeight - Screen.maxHeight * 0.5;
          snapPoints.push({ y: snapPointHeight });
        }
        snapPoints.push({ y: Screen.maxHeight - bottomSheetHeight });
      }
    }

    return snapPoints;
  }

  getSnapPointId() {
    return this.state.snapPointId;
  }

  launch() {
    this.setState({ bottomSheetVisibility: true });
    this.bottomSheet.current.snapTo({ index: 1 });
  }

  close() {
    this.bottomSheet.current.snapTo({ index: 0 });
    if (this.props.hasKeyboard) {
      Keyboard.dismiss();
    }
  }

  _renderBottomSheetBackground() {
    let inputHeight =
      this.state.bottomSheetHeight >
      Screen.maxHeight * (1 - this.props.initialExpansionSize)
        ? Screen.maxHeight * (1 - this.props.initialExpansionSize)
        : this.state.bottomSheetHeight;

    if (this.state.bottomSheetVisibility) {
      return (
        <Animated.View
          useNativeDriver
          pointerEvents="auto"
          style={[
            styles.panelContainer,
            {
              backgroundColor: "#000000A6",
              opacity: this._deltaY.interpolate({
                inputRange: [Screen.maxHeight - inputHeight, Screen.maxHeight],
                outputRange: [0.75, 0],
                extrapolateLeft: `clamp`,
                extrapolateRight: `clamp`,
                transform: [1, { perspective: 1000 }]
              })
            }
          ]}>
          <TouchableOpacity
            style={{ height: `100%`, width: `100%` }}
            onPress={() => {
              this.close();
            }}
          />
        </Animated.View>
      );
    }
  }

  render() {
    const {
      bodyStyle,
      children,
      initialExpansionSize,
      hasKeyboard
    } = this.props;
    let bottomSheetHeight = this.state.bottomSheetHeight;
    let panelHeightStyle = {};
    
    if (!hasKeyboard) {
      if (
        bottomSheetHeight <= Screen.maxHeight * initialExpansionSize &&
        bottomSheetHeight != 0
      ) {
        panelHeightStyle = {
          height: Screen.maxHeight * initialExpansionSize,
          alignSelf: `stretch`
        };
      }
    }

    return (
      <View style={styles.panelContainer} pointerEvents="box-none">
        {this._renderBottomSheetBackground()}
        <Interactable.View
          ref={this.bottomSheet}
          verticalOnly
          snapPoints={this.getSnapPoints()}
          initialPosition={{ y: Screen.maxHeight }}
          animatedValueY={this._deltaY}
          onSnapStart={event => {
            const snapPointId = event.nativeEvent.index;
            if (snapPointId === 0) {
              this.props.onClose();
              this.setState({ bottomSheetVisibility: false, snapPointId });
              if (hasKeyboard) {
                Keyboard.dismiss();
              }
            } else {
              this.setState({ snapPointId });
            }
          }}>
          <View style={styles.panelWrapper}>
            <View
              style={[
                styles.panel,
                panelHeightStyle,
                bodyStyle,
                { height: this.state.bottomSheetHeight},
              ]}>
              <View style={styles.topRounder} />
              <ScrollView
                keyboardShouldPersistTaps="always"
                scrollEnabled={false}
                onContentSizeChange={(contentWidth, contentHeight) => {
                  if (this.state.bottomSheetHeight !== contentHeight) {
                    this.setState({ bottomSheetHeight: contentHeight });
                  }
                }}>
                {children}
              </ScrollView>

              {/* {Platform.OS === `android` && (
                <View
                  style={{
                    backgroundColor: `gray`,
                    height: hp(10),
                    width: wp(100),
                  }}
                />
              )} */}
            </View>
          </View>
        </Interactable.View>
      </View>
    );
  }
}

BottomSheet.propTypes = propTypes;
BottomSheet.defaultProps = defaultProps;

export default BottomSheet;
