import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import Text from '../../Components/Text';
import HeaderButton from '../../Components/HeaderButton';

// Libs and Themes
import colors from '../../Themes/Colors';
import images from '../../Themes/Images';

// Styles
import styles from './styles';

const LoginScreen = ({ reset, signin, signinLoading, signinError, navigation, lastUsedEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = () => signin(email, password);

  let inputRef = React.createRef();

  useEffect(() => {
    reset();
    setEmail(lastUsedEmail);
  }, []);
  
  return (
    <LinearGradient colors={colors.light_grey_green} style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="always">
        <Image source={images.logo} style={styles.image} />
        <Text style={styles.title}>{'Welcome to\nwashr'}</Text>
        <View style={styles.card}>
          <Input
            value={email}
            onSubmitEditing={() => inputRef.focus()}
            onChangeText={setEmail}
            label="Email Adress"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            error={signinError.email}
          />
          <Input
            value={password}
            inputRef={ref => (inputRef = ref)}
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry
            style={styles.input}
            label="Password"
            onSubmitEditing={handleSignin}
            returnKeyType="done"
            error={signinError.password}
          />
          <Button
            title="Log In"
            style={styles.loginButton}
            containerStyle={styles.buttonContainerStyle}
            disabled={!email || !password}
            loading={signinLoading}
            onPress={handleSignin}
          />
          <TouchableOpacity onPress={() => navigation.navigate(`ForgotPasswordScreen`)}>
            <Text style={styles.password}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Wait, I don’t want to do laundry…</Text>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

LoginScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <HeaderButton
        title="Apply Today!"
        style={styles.applyButton}
        onPress={() => {
          navigation.navigate('ApplyNowScreen');
        }}
      />
    ),
  }
}


LoginScreen.propTypes = {
  reset: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  signin: PropTypes.func.isRequired,
  signinLoading: PropTypes.bool.isRequired,
  signinError: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
};

LoginScreen.defaultProps = {
  signinError: {
    email: '',
    password: '',
  },
};

export default LoginScreen;
