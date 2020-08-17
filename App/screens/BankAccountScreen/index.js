import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, TouchableOpacity, Switch } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../../Components/Text';
import styles from './styles';
import images from '../../Themes/Images';
import UsersCreators from "../../Redux/UsersRedux";

const BankAccountScreen = ({
  navigation,
  user,
  deleteBankAccount,
  setBankAccountAsDefault,
}) => {
  
  const [bankAccount, setBankAccount] = useState(navigation.getParam('bankAccount'));
  const [isDefault, setDefault] = useState(bankAccount.default);

  useEffect(() => {
    const id = bankAccount.id
    const updatedBankAccount = user.bank_accounts.find(ba => {return ba.id === id})

    if (updatedBankAccount) {
      setBankAccount(updatedBankAccount)
      setDefault(updatedBankAccount.default)
    }
    
  }, [user])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.lineContainer}>
        <Text style={styles.infoText}>{bankAccount.bankName}</Text>
      </View>
      <View style={styles.lineContainer}>
        <Text style={styles.infoText}>
          Account ending in ••• {bankAccount.last4}
        </Text>
      </View>
      <View style={styles.lineContainer}>
        <Text style={styles.infoText}>Default</Text>
        <Switch
          disabled={isDefault}
          value={isDefault}
          onValueChange={() => {
            setBankAccountAsDefault(bankAccount.id);
            setDefault(true);
          }}
        />
      </View>

      {user.bank_accounts.length > 1 && (
        <TouchableOpacity
          onPress={() => deleteBankAccount(bankAccount.id)}
          style={styles.deleteContainer}>
          <Text style={styles.delete}>Delete Account</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

BankAccountScreen.defaultProps = {
};

BankAccountScreen.propTypes = {
  
};

const mapStateToProps = ({ users: { user } }) => ({
  user,
});

const mapDispatchToProps = dispatch => {
  return {
    deleteBankAccount: bankAccountId =>
      dispatch(UsersCreators.deleteBankAccount(bankAccountId, true)),
    setBankAccountAsDefault: bankAccountId =>
      dispatch(UsersCreators.setBankAccountAsDefault(bankAccountId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BankAccountScreen);
