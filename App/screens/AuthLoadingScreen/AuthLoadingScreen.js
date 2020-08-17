import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import colors from '../../Themes/Colors';
import styles from './styles';

const AuthLoadingScreen = ({ firstTime, navigation }) => {
  useEffect(() => {
    if (firstTime) {
      navigation.navigate('Onboarding');
    } else {
      Auth.currentAuthenticatedUser({ bypassCache: true })
        .then(() => navigation.navigate('Main'))
        .catch(() => navigation.navigate('Auth'));
      // navigation.navigate('App');
      // Auth.currentAuthenticatedUser()
      //   .then(() => navigation.navigate('App'))
      //   .catch(() => navigation.navigate('Auth'));
    }
  }, []);
  return (
    <LinearGradient colors={colors.light_grey_green} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.light_green} />
      <ActivityIndicator size="large" color={colors.navi} />
    </LinearGradient>
  );
};

AuthLoadingScreen.propTypes = {
  firstTime: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AuthLoadingScreen;
