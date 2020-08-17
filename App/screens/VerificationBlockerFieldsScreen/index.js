import React, { Component } from 'react';
import { View, Linking, AppState, BackHandler, Image, Keyboard, Platform } from 'react-native';
import { connect } from 'react-redux';
import { TouchableRipple, Portal } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import Button from '../../Components/Button';
import Text from '../../Components/Text';
import Input from '../../Components/Input';
import UsersCreators from '../../Redux/UsersRedux';
import styles from './styles';
import colors from '../../Themes/Colors';


class VerificationBlockerScreen extends Component {
  static navigationOptions = ({ navigation }) => {};

  ssnRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      dob: ``,
      ssn: ``,
      photoIDSource: null,
      tosAccepted: false,
      updateStripeAccountInfoLoading: false,
      showDatePicker: false,
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleBackButton() {
    return true;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.updateStripeAccountInfoLoading !==
      this.props.updateStripeAccountInfoLoading
    ) {
      this.setState({
        updateStripeAccountInfoLoading: this.props
          .updateStripeAccountInfoLoading,
      });
    }

    if (
      prevProps.stripeAccountLink !== this.props.stripeAccountLink &&
      this.props.stripeAccountLink.account_link
    ) {
      Linking.openURL(this.props.stripeAccountLink.account_link);
    }

    if (this.props.user && this.props.user.verification_status === `verified`) {
      this.props.navigation.popToTop();
      this.props.navigation.popToTop();
    }

    if (this.props.user && this.props.user.verification_status === `pending`) {
      this.props.navigation.navigate(`VerificationBlockerPendingScreen`)
    }
  }

  _handleMask = (text, previousText, dashPositions, maxLength) => {
    if (
      previousText &&
      previousText.endsWith('-') &&
      !text.endsWith('-') &&
      previousText.length > text.length
    ) {
      text = text.substring(0, text.length - 1);
    } else if (dashPositions.includes(text.length)) {
      text += '-';
    }

    if (text.length > maxLength) {
      text = text.substring(0, maxLength);
    }

    return text;
  };

  render() {
    const { user } = this.props;

    return (
      <KeyboardAwareScrollView
        style={styles.container}
        onScroll={() => this.setState({ showDatePicker: false })}>
        <View style={styles.headerContainer}>
          <Image source={require('../../Images/bank.png')} />
          <Text numberOfLines={2} style={styles.headerTitle}>
            Verify Your{`\n`}Account
          </Text>
        </View>

        <View style={styles.fieldsContainer}>
          <Input
            value={this.state.dob}
            onChangeText={text =>
              this.setState({
                dob: this._handleMask(text, this.state.dob, [2, 5], 10),
              })
            }
            onFocus={() => {
              this.setState({ showDatePicker: true });
              Keyboard.dismiss();
            }}
            onSubmitEditing={() => this.ssnRef.focus()}
            label="Date of Birth"
            style={styles.input}
            keyboardType="numeric"
            autoCapitalize="words"
            returnKeyType="next"
          />

          <Input
            value={this.state.ssn}
            ref={this.ssnRef}
            onChangeText={text => this.setState({ ssn: text })}
            onFocus={() => {
              this.setState({ showDatePicker: false });
            }}
            label="Last of four numbers of SSN"
            style={styles.input}
            keyboardType="numeric"
            autoCapitalize="words"
            returnKeyType="done"
          />
        </View>

        <TouchableRipple
          style={[
            styles.uploadIdButton,
            this.state.photoIDSource
              ? styles.uploadIdButtonSelected
              : undefined,
          ]}
          rippleColor={colors.snow}
          onPress={() => {
            this.setState({ showDatePicker: false });
            ImagePicker.showImagePicker(
              { maxWidth: 600, maxHeight: 600 },
              response => {
                if (response.uri && response.data) {
                  this.setState({ photoIDSource: response });
                }
              },
            );
          }}>
          <View style={styles.IDButtonContent}>
            <View style={styles.IDButtonLeft}>
              <Image
                style={styles.photoIdImage}
                source={require(`../../Images/photo_id.png`)}
              />
              <Text style={styles.uploadIDText}>Upload Valid Photo ID</Text>
            </View>
            {this.state.photoIDSource && (
              <Image
                style={styles.IDButtonRight}
                source={require(`../../Images/check.png`)}
              />
            )}
          </View>
        </TouchableRipple>

        <View style={styles.tosContainer}>
          <TouchableRipple
            style={styles.checkboxContainer}
            rippleColor={colors.snow}
            onPress={() => {
              this.setState({ showDatePicker: false });
              this.setState({ tosAccepted: !this.state.tosAccepted })
            }}>
            <View style={styles.checkboxBorder}>
              <View
                style={
                  this.state.tosAccepted ? styles.checkboxSelected : undefined
                }
              />
            </View>
          </TouchableRipple>

          <TouchableRipple
            rippleColor={colors.snow}
            onPress={() => {
              this.setState({ showDatePicker: false });
              Linking.openURL(`https://stripe.com/connect-account/legal`)
            }}>
            <Text style={styles.tosText}>
              I have accepted Stripe's{' '}
              <Text style={styles.tosLink}>Terms and Conditions</Text>
            </Text>
          </TouchableRipple>
        </View>

        <Button
          title="Update Information"
          containerStyle={styles.verifyButtonContainer}
          loading={this.state.updateStripeAccountInfoLoading}
          disabled={
            !this.state.photoIDSource ||
            !this.state.ssn ||
            !this.state.dob ||
            !this.state.tosAccepted
          }
          onPress={() => {
            this.setState({ showDatePicker: false });
            this.props.updateStripeAccountInfo(
              this.state.photoIDSource.data,
              this.state.photoIDSource.type,
              this.state.ssn,
              this.state.dob,
            );
          }}
        />
        <Portal>
          {this.state.showDatePicker && (
            <View
              style={{ height: `100%`, justifyContent: `flex-end` }}
              pointerEvents="box-none">
              <DateTimePicker
                style={{ backgroundColor: `white` }}
                value={
                  this.state.dob
                    ? moment(this.state.dob, `MM-DD-YYYY`).toDate()
                    : new Date()
                }
                onChange={(event, date) => {
                  this.setState({ dob: moment(date).format(`MM-DD-YYYY`), showDatePicker: Platform.OS === 'ios'});
                }}
              />
            </View>
          )}
        </Portal>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users.user,
    updateStripeAccountInfoLoading: state.users.updateStripeAccountInfoLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStripeAccountInfo: (base64Image, mimetype, last4SSN, dateOfBirth) =>
      dispatch(
        UsersCreators.updateStripeAccountInfo(
          base64Image,
          mimetype,
          last4SSN,
          dateOfBirth,
        ),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerificationBlockerScreen);
