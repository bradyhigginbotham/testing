import React, { Component, createRef } from 'react';
import { View, AppState, Image, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stripe from 'tipsi-stripe';
import { Portal, TouchableRipple } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import EventEmitter from '../../Services/EventEmitter';
import Button from '../../Components/Button';
import Text from '../../Components/Text';
import Input from '../../Components/Input';
import BottomSheet from '../../Components/BottomSheet';
import UsersCreators from '../../Redux/UsersRedux';
import styles from './styles';
import colors from '../../Themes/Colors';


class BankAccountBlockerScreen extends Component {
  static navigationOptions = ({ navigation }) => {};

  routingNumberBottomSheet = React.createRef();
  accountNumberBottomSheet = React.createRef();

  constructor(props) {
    super(props);

    this.routingInputRef = createRef();
    this.accountInputRef = createRef();

    this.state = {
      name: ``,
      routingNumber: ``,
      accountNumber: ``,
      tokenLoading: false,
      addBankAccountLoading: false,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  _handleSave = async () => {
    if (this.state.tokenLoading) {
      return;
    }

    try {
      this.setState({ tokenLoading: true });
      const token = await stripe.createTokenWithBankAccount({
        countryCode: 'us',
        currency: 'usd',
        accountHolderType: 'individual',
        accountNumber: this.state.accountNumber,
        routingNumber: this.state.routingNumber,
        accountHolderName: this.state.name,
      });
      this.props.addBankAccount(token.tokenId);
    } catch (error) {
      console.log('error', error);
      EventEmitter.emit('showNotification', `${error.message}`);
    } finally {
      this.setState({ tokenLoading: false });
    }
  };

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      this.props.getUser();
    }
  };

  handleBackButton() {
    return true;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.user &&
      this.props.user.bank_accounts &&
      this.props.user.bank_accounts.length > 0
    ) {
      this.props.navigation.popToTop();
    }

    if (this.props.addBankAccountLoading != prevProps.addBankAccountLoading) {
      this.setState({
        addBankAccountLoading: this.props.addBankAccountLoading,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.container}>
          <Image
            source={require('../../Images/bank.png')}
            style={styles.graphics}
          />
          <Text style={styles.instructionsText}>
            Finally, we need to know where to send your money. Please link your
            bank account before continuing.
          </Text>
          <Input
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
            onSubmitEditing={() => this.routingInputRef.focus()}
            label="Account Holder Name"
            style={styles.input}
            keyboardType="default"
            autoCapitalize="words"
            returnKeyType="next"
          />
          <View style={styles.inputWrapper}>
            <Input
              value={this.state.routingNumber}
              inputRef={ref => (this.routingInputRef = ref)}
              onChangeText={text => this.setState({ routingNumber: text })}
              onSubmitEditing={() => this.accountInputRef.focus()}
              label="ABA Routing Number"
              style={styles.input}
              containerStyle={styles.inputContainer}
              keyboardType="number-pad"
              autoCapitalize="none"
              returnKeyType="next"
            />
            <TouchableRipple
              rippleColor={colors.snow}
              style={styles.information}
              onPress={() => this.routingNumberBottomSheet.current.launch()}>
              <Image source={require('../../Images/information.png')} />
            </TouchableRipple>
          </View>
          <View style={styles.inputWrapper}>
            <Input
              value={this.state.accountNumber}
              inputRef={ref => (this.accountInputRef = ref)}
              onChangeText={text => this.setState({ accountNumber: text })}
              label="Account Number"
              style={styles.input}
              containerStyle={styles.inputContainer}
              keyboardType="number-pad"
              autoCapitalize="none"
              returnKeyType="next"
            />
            <TouchableRipple
              style={styles.information}
              rippleColor={colors.snow}
              onPress={() => this.accountNumberBottomSheet.current.launch()}>
              <Image source={require('../../Images/information.png')} />
            </TouchableRipple>
          </View>
        </KeyboardAwareScrollView>
        <Button
          title="Link"
          containerStyle={styles.verifyButtonContainer}
          loading={this.state.tokenLoading || this.state.addBankAccountLoading}
          onPress={this._handleSave}
        />

        <Portal>
          <BottomSheet ref={this.routingNumberBottomSheet}>
            <View style={styles.bottomSheetContainer}>
              <Image
                style={styles.bottomSheetImage}
                source={require('../../Images/routing_number.png')}
              />
              <Text style={styles.bottomSheetTitle}>My Routing Number</Text>
              <Text style={styles.bottomSheetText}>
                It’s the 9-digit number at the lower left corner of your check.
                No checks? Log into your bank online.
              </Text>

              <TouchableRipple
                style={styles.bottomSheetOptionContainer}
                onPress={() => this.routingNumberBottomSheet.current.close()}>
                <Text style={styles.bottomSheetOptionText}>Got It</Text>
              </TouchableRipple>
            </View>
          </BottomSheet>

          <BottomSheet ref={this.accountNumberBottomSheet}>
            <View style={styles.bottomSheetContainer}>
              <Image
                style={styles.bottomSheetImage}
                source={require('../../Images/account_number.png')}
              />
              <Text style={styles.bottomSheetTitle}>My Account Number</Text>
              <Text style={styles.bottomSheetText}>
                It’s the 3-17 digit number on the lower portion of your check,
                just near your routing number. No checks? Log into your bank
                online.
              </Text>

              <TouchableRipple
                style={styles.bottomSheetOptionContainer}
                onPress={() => this.accountNumberBottomSheet.current.close()}>
                <Text style={styles.bottomSheetOptionText}>Got It</Text>
              </TouchableRipple>
            </View>
          </BottomSheet>
        </Portal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users.user,
    addBankAccountLoading: state.users.addBankAccountLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(UsersCreators.getUser()),
    addBankAccount: (tokenId) => dispatch(UsersCreators.addBankAccount(tokenId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BankAccountBlockerScreen);
