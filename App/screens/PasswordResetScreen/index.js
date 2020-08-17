import React, { Component, createRef } from 'react';
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

class PasswordResetScreen extends Component {
  static navigationOptions = ({ navigation }) => {};

  constructor(props) {
    super(props);
    
    this.inputRef = React.createRef();

    this.state = { 
      code: ``,
      password: ``,
      forgotPasswordLoading: false,
     };
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    if (prevProps.forgotPasswordLoading != this.props.forgotPasswordLoading) {
      this.setState({forgotPasswordLoading: this.props.forgotPasswordLoading});
    }
  }
  
  _handleSubmit = () => {
    const { username } = this.props.forgotPasswordSuccessData;
    this.props.resetPassword(username, this.state.code, this.state.password);
  }

  render() {
    return (
      <LinearGradient colors={colors.light_grey_green} style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="always">
          <View style={styles.card}>
            <Text style={styles.text}>
              A verification code was sent to your{' '}
              {this.props.forgotPasswordSuccessData.AttributeName} (
              {this.props.forgotPasswordSuccessData.Destination}).
              {`\n\n`}Input the code and choose a new password.
            </Text>
            <Input
              value={this.state.code}
              onSubmitEditing={() => this.inputRef.focus()}
              onChangeText={val => this.setState({ code: val })}
              label="Verification Code"
              style={styles.input}
              keyboardType="numeric"
              autoCapitalize="none"
              returnKeyType="next"
              autoFocus
            />
            <Input
              value={this.state.password}
              inputRef={ref => (this.inputRef = ref)}
              onChangeText={val => this.setState({ password: val })}
              label="New Password"
              style={styles.input}
              autoCapitalize="none"
              returnKeyType="done"
              secureTextEntry
              onSubmitEditing={this._handleSubmit}
            />
            <Button
              title="Set New Password"
              style={styles.loginButton}
              containerStyle={styles.buttonContainerStyle}
              disabled={
                this.state.code.length == 0 || this.state.password.length == 0
              }
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
    forgotPasswordSuccessData: state.authentication.forgotPasswordSuccessData,
    forgotPasswordLoading: state.authentication.forgotPasswordLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: (username, code, newPassword) =>
      dispatch(
        AuthenticationCreators.resetPassword(username, code, newPassword),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordResetScreen);
