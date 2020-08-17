import React, { Component } from 'react';
import { View, Linking, AppState, BackHandler, Image } from 'react-native';
import { connect } from 'react-redux';
import Intercom from 'react-native-intercom';
import { TouchableRipple } from 'react-native-paper';

import Button from '../../Components/Button';
import Text from '../../Components/Text';
import UsersCreators from '../../Redux/UsersRedux';
import styles from './styles';
import colors from '../../Themes/Colors';


class VerificationBlockerPendingScreen extends Component {
  static navigationOptions = ({ navigation }) => {};

  constructor(props) {
    super(props);

    this.updateInterval = setInterval(() => {
      this.props.getUser();
    }, 30000);
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      this.props.getUser();
    }
  };

  handleBackButton() {
    return true;
  }

  componentDidUpdate(prevProps) {
    if (this.props.user && this.props.user.verification_status === `verified`) {
      this.props.navigation.popToTop();  
      this.props.navigation.popToTop();  

      if (!response.data.bank_accounts || response.data.bank_accounts.length == 0) {
        this.props.navigation.navigate('BankAccountBlockerScreen')
      }
    }s

    if (this.props.user && this.props.user.verification_status === `unverified`) {
      this.props.navigation.navigate(`VerificationBlockerScreen`);
    }
    
  }

  render() {
    const { user } = this.props;
    let message = `We are still verifying your personal information. Please wait a few minutes and try again.`;

    if (user && user.verification_status === `unverified`) {
      message = `We still need to verify some personal information you before you can start washing.`;
    }

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={require('../../Images/bank.png')} />
          <Text numberOfLines={2} style={styles.headerTitle}>
            Verify Your{`\n`}Account
          </Text>
        </View>

        <View style={styles.fieldsContainer}>
          <Text style={styles.fieldsTitle}>
            We are verifying your information…{`\n`}this might take a few
            moments.
          </Text>
          <Text style={styles.status}>Status: Pending</Text>
        </View>
        <Button
          title=""
          loading
          containerStyle={styles.verifyButtonContainer}
          onPress={() => {
            this.props.navigation.navigate(`VerificationBlockerFieldsScreen`);
          }}
        />
        <TouchableRipple
          rippleColor={colors.snow}
          onPress={() => Intercom.displayMessageComposer()}>
          <Text style={styles.instructionsText}>
            You may be asked to re-verify some information; this is to be
            expected. If you have concerns or questions,{` `}
            <Text style={{ textDecorationLine: `underline` }}>
              Contact Support.
            </Text>
          </Text>
        </TouchableRipple>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(UsersCreators.getUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerificationBlockerPendingScreen);
