import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../../Components/Text';
import styles from './styles';
import images from '../../Themes/Images';

const BankAccountsScreen = ({navigation, user }) => {
  const [bankAccounts, setBankAccounts] = useState(user && user.bank_accounts ? user.bank_accounts : [])

  useEffect(() => {
    if (user && user.bank_accounts) {
      setBankAccounts(user.bank_accounts)
    }
  }, [user])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navigation}>
        <Text style={styles.sectionTitle}>Linked Accounts</Text>

        {bankAccounts.map(b => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("BankAccount", {bankAccount: b})}>
              <View style={styles.bankAccountContainer}>
                <View>
                  <Text style={styles.bankName}>{b.bankName}</Text>
                  <Text style={styles.accountEnding}>
                    Ending in •••{b.last4}
                  </Text>
                </View>
                <View style={styles.rightContainer}>
                  {b.default && (
                    <Text style={styles.defaultIndicator}>Default</Text>
                  )}
                  <Image
                    style={styles.accountOptionRightIcon}
                    source={images.forwardArrow}
                  />
                </View>
              </View>
              <View style={styles.separator} />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

BankAccountsScreen.defaultProps = {
  carCapacity: 'No Limit',
  defaultMapApp: 'Google Maps',
  radius: '15',
};

BankAccountsScreen.propTypes = {
  carCapacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultMapApp: PropTypes.string,
  radius: PropTypes.number,
};

BankAccountsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <TouchableOpacity
        style={styles.addContainer}
        onPress={() => {
          navigation.navigate("BankAccountCreate")
        }}>
        <Image style={styles.add} source={require("../../Images/add_new.png")}/>
      </TouchableOpacity>
    ),
  };
};

const mapStateToProps = ({ users: { user } }) => ({
  user,
});

export default connect(
  mapStateToProps,
  null
)(BankAccountsScreen);
