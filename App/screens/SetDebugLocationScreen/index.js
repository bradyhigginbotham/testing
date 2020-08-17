import React, { Component } from 'react';
import {
  ScrollView,
  View,
  FlatList,
  PanResponder,
  Keyboard,
} from 'react-native';

import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import RNGooglePlaces from 'react-native-google-places';
import { Popover, PopoverContainer } from 'react-native-simple-popover';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LocationCreators, {LocationSelectors} from "../../Redux/LocationRedux";

import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Text from '../../Components/Text';

// Styles
import styles from './styles';
import { TouchableRipple } from 'react-native-paper';

const scale = (value) => {
  return value
}

const moderateScale = (value, otherValue) => {
  return value;
};

const AutoCompleteItem = ({item, onPress}) => {
  return (
    <TouchableRipple
      onPress={() => onPress(item)}>
      <View style={styles.row}>
        <Text style={styles.primaryText}>{item.primaryText}</Text>
        <Text style={styles.secondaryText}>{item.secondaryText}</Text>
      </View>
    </TouchableRipple>
  );
}
// eslint-disable-next-line
class SetDebugLocationScreen extends Component {
  static navigationOptions = {
    title: `Set Debug Location`,
  };

  constructor(props) {
    super(props);
    this.state = {
      addressQuery: props.debugLocation.address || ``,
      locationResult: props.debugLocation.location ? props.debugLocation : {},
      predictions: null,
      scrollEnabled: true,
      showList: false,
    };
  }

  componentDidMount() {
    
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > 2; // can adjust this num
      },
      onPanResponderGrant: () => {
        this.scroll.setNativeProps({ scrollEnabled: false });
      },
      onPanResponderMove: () => {},
      onPanResponderTerminationRequest: () => true,
    });
  }

  onQueryChange = text => {
    this.setState({ addressQuery: text, showList: true });

    if (text.length >= 2) {
      RNGooglePlaces.getAutocompletePredictions(text, {
        type: `address`,
      }).then(places => {
        this.setState({ predictions: places });
      });
    }
  };

  _onPress = item => {
    RNGooglePlaces.lookUpPlaceByID(item.placeID)
      .then(results => {

        this.setState({
          showList: false,
          scrollEnabled: true,
          addressQuery: results.address,
          locationResult: results,
        });
      })
      .catch(() => {});
    Keyboard.dismiss();
  };

  render() {
    
    return (
      <SafeAreaView style={{ backgroundColor: `white` }}>
        <KeyboardAwareScrollView
          innerRef={ref => {
            this.scroll = ref;
          }}
          style={{ height: '100%' }}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="always"
          enableOnAndroid
          scrollEnabled={this.state.scrollEnabled}
          onScroll={() => {
            this.setState({
              showList: false,
            });
          }}>
          <PopoverContainer>
            <View style={styles.mainContainer}>
              <Popover
                arrowColor="transparent"
                arrowWidth={0}
                arrowHeight={0}
                placement="bottom"
                isVisible={
                  this.state.addressQuery.length >= 2 && this.state.showList
                }
                component={() => {
                  return (
                    <View style={styles.popupWrapper} pointerEvents="box-none">
                      <FlatList
                        {...this._panResponder.panHandlers}
                        data={this.state.predictions}
                        extraData={this.state}
                        nestedScrollEnabled
                        keyboardShouldPersistTaps="always"
                        renderItem={({ item }) => (
                          <AutoCompleteItem
                            item={item}
                            onPress={item => this._onPress(item)}
                          />
                        )}
                        keyExtractor={item => item.placeID}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.popupContentContainer}
                        onScrollEndDrag={() =>
                          this.scroll.setNativeProps({
                            scrollEnabled: true,
                          })
                        }
                      />
                    </View>
                  );
                }}>
                <View>
                  <Input
                    style={styles.textInput}
                    placeholder="Address"
                    autoCapitalize="words"
                    ref={ref => (this.addressEdit = ref)}
                    value={this.state.addressQuery}
                    onChangeText={this.onQueryChange}
                    textContentType="streetAddressLine1"
                    onSubmitEditing={() => {
                      this.setState({
                        showList: false,
                      });
                      this.checkService();
                    }}
                    onFocus={() => {
                      this.setState({
                        showList: true,
                      });
                    }}
                    returnKeyType="done"
                  />
                </View>
              </Popover>

              <Button
                style={{
                  marginTop: scale(50),
                  marginHorizontal: scale(32),
                }}
                title="Save Location"
                onPress={() => {
                  if (this.state.locationResult.location) {
                    this.props.setDebugLocation(this.state.locationResult);
                    this.props.navigation.goBack();
                  }
                }}
              />

              <Button
                style={{
                  marginTop: scale(20),
                  marginHorizontal: scale(32),
                }}
                title="Clear Location"
                onPress={() => {
                  this.props.setDebugLocation({});
                  this.props.navigation.goBack()
                }}
              />
            </View>
          </PopoverContainer>
        </KeyboardAwareScrollView>

      </SafeAreaView>
    );
  }
}

const defaultProps = {
  debugLocation: {}
}

const mapStateToProps = state => {
  return {
    debugLocation: state.location.debugLocation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDebugLocation: (parameters) =>
      dispatch(LocationCreators.setDebugLocation(parameters)),
  };
};

SetDebugLocationScreen.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetDebugLocationScreen);
