import React, { useEffect, useState, createRef } from 'react';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Image, View, TouchableOpacity, Switch } from 'react-native';
import { TouchableRipple, Portal } from "react-native-paper";
import stripe from 'tipsi-stripe';

import EventEmitter from '../../Services/EventEmitter';
import Button from '../../Components/Button';
import Text from '../../Components/Text';
import Input from '../../Components/Input';
import BottomSheet from '../../Components/BottomSheet';
import UsersCreators from '../../Redux/UsersRedux';
import styles from './styles';
import colors from '../../Themes/Colors';

const BankAccountScreen = ({ navigation, user, addBankAccount, addBankAccountLoading }) => {
  const [name, setName] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const routingInputRef = createRef();
  const accountInputRef = createRef();

  const routingNumberBottomSheet = createRef();
  const accountNumberBottomSheet = createRef();

  const handleSave = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const token = await stripe.createTokenWithBankAccount({
        countryCode: 'us',
        currency: 'usd',
        accountHolderType: 'individual',
        accountNumber: accountNumber,
        routingNumber: routingNumber,
        accountHolderName: name,
      });
      addBankAccount(token.tokenId);
    } catch (error) {
      setLoading(false);
      EventEmitter.emit('showNotification', error.message);
    }
  };

  useEffect(() => {
    setLoading(addBankAccountLoading)
  }, [addBankAccountLoading])

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={styles.container}>
        <Image
          source={require('../../Images/bank.png')}
          style={styles.graphics}
        />
        <Input
          value={name}
          onChangeText={text => setName(text)}
          onSubmitEditing={() => routingInputRef.current.focus()}
          label="Account Holder Name"
          style={styles.input}
          keyboardType="default"
          autoCapitalize="words"
          returnKeyType="next"
        />
        <View style={styles.inputWrapper}>
          <Input
            value={routingNumber}
            inputRef={routingInputRef}
            onChangeText={text => setRoutingNumber(text)}
            onSubmitEditing={() => accountInputRef.current.focus()}
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
            onPress={() => routingNumberBottomSheet.current.launch()}>
            <Image source={require('../../Images/information.png')} />
          </TouchableRipple>
        </View>
        <View style={styles.inputWrapper}>
          <Input
            value={accountNumber}
            inputRef={accountInputRef}
            onChangeText={text => setAccountNumber(text)}
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
            onPress={() => accountNumberBottomSheet.current.launch()}>
            <Image source={require('../../Images/information.png')} />
          </TouchableRipple>
        </View>
      </KeyboardAwareScrollView>
      <Button
        title="Save"
        containerStyle={styles.verifyButtonContainer}
        loading={loading}
        onPress={handleSave}
      />

      <Portal>
        <BottomSheet ref={routingNumberBottomSheet}>
          <View style={styles.bottomSheetContainer}>
            <Image
              style={styles.bottomSheetImage}
              source={require('../../Images/routing_number.png')}
            />
            <Text style={styles.bottomSheetTitle}>My Routing Number</Text>
            <Text style={styles.bottomSheetText}>
              It’s the 9-digit number at the lower left corner of your check. No
              checks? Log into your bank online.
            </Text>

            <TouchableRipple
              style={styles.bottomSheetOptionContainer}
              onPress={() => routingNumberBottomSheet.current.close()}>
              <Text style={styles.bottomSheetOptionText}>Got It</Text>
            </TouchableRipple>
          </View>
        </BottomSheet>

        <BottomSheet ref={accountNumberBottomSheet}>
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
              onPress={() => accountNumberBottomSheet.current.close()}>
              <Text style={styles.bottomSheetOptionText}>Got It</Text>
            </TouchableRipple>
          </View>
        </BottomSheet>
      </Portal>
    </View>
  );
};

BankAccountScreen.defaultProps = {
};

BankAccountScreen.propTypes = {
  
};

const mapStateToProps = ({ users: { user, addBankAccountLoading } }) => ({
  user,
  addBankAccountLoading
});

const mapDispatchToProps = dispatch => {
  return {
    addBankAccount: tokenId => dispatch(UsersCreators.addBankAccount(tokenId, true)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BankAccountScreen);
