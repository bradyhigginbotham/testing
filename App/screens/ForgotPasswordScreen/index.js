import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AuthenticationCreators from '../../Redux/AuthenticationRedux';
import colors from '../../Themes/Colors';
import Button from '../../Components/Button';
import Text from '../../Components/Text';
import Input from '../../Components/Input';
import styles from './styles';

class ForgotPasswordScreen extends Component {
  static navigationOptions = ({ navigation }) => {};

  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      forgotPasswordLoading: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.forgotPasswordLoading != this.props.forgotPasswordLoading) {
      this.setState({
        forgotPasswordLoading: this.props.forgotPasswordLoading,
      });
    }
  }

  _handleSubmit = () => {
    this.props.forgotPassword(this.state.email);
  }

  render() {
    return (
      <LinearGradient colors={colors.light_grey_green} style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="always">
          <View style={styles.card}>
            <Text style={styles.title}>Forgot Password?</Text>
            <Input
              value={this.state.email}
              onChangeText={val => this.setState({ email: val })}
              label="Email Adress"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={this._handleSubmit}
              autoFocus
            />
            <Button
              title="Reset Password"
              style={styles.loginButton}
              containerStyle={styles.buttonContainerStyle}
              disabled={this.state.email.length < 3}
              loading={this.state.forgotPasswordLoading}
              onPress={this._handleSubmit}
            />
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    forgotPasswordLoading: state.authentication.forgotPasswordLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    forgotPassword: (username) =>
      dispatch(AuthenticationCreators.forgotPassword(username)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordScreen);
