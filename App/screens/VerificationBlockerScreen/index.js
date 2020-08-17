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


class VerificationBlockerScreen extends Component {
  static navigationOptions = ({ navigation }) => {};

  constructor(props) {
    super(props);
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
    }
  }

  render() {
    const { user } = this.props;
    
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={require('../../Images/bank.png')} />
          <Text numberOfLines={2} style={styles.headerTitle}>
            Verify Your{`\n`}Account
          </Text>
        </View>

        <View style={styles.fieldsContainer}>
          <Text style={styles.fieldsTitle}>We may need a little info:</Text>
          <Text style={styles.firstField}>• Your Date of Birth</Text>
          <Text style={styles.otherFields}>• Last 4 Numbers of Your SSN</Text>
          <Text style={styles.lastField}>• Picture of Valid ID</Text>
        </View>
        <Button
          title="Verify Now"
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
)(VerificationBlockerScreen);
