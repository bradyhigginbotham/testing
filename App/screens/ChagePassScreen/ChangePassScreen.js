import React, {useState, useEffect} from 'react';
import {ScrollView, View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

// Components
import Text from '../../Components/Text';
import Input from '../../Components/Input';

// Styles
import styles from './styles';

const ChagePassScreen = ({navigation, changePassword, changePasswordError}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const setCurrentPass = text => {
    setCurrentPassword(text);
    navigation.setParams({currentPassword: text});
  };

  const setNewPass = text => {
    setNewPassword(text);
    navigation.setParams({newPassword: text});
  };

  const passChangePasswordAsParam = () => {
    navigation.setParams({changePassword});
  };

  useEffect(() => passChangePasswordAsParam(), []);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always">
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Your password my be at least 8 characters, and must contain 1 number and 1 capital
              letter.
            </Text>
          </View>
          <Input
            secureTextEntry
            autoCapitalize="none"
            value={currentPassword}
            label="Current Password"
            onChangeText={e => setCurrentPass(e)}
          />
          <Input
            secureTextEntry
            value={newPassword}
            label="New Password"
            autoCapitalize="none"
            onChangeText={e => setNewPass(e)}
            // eslint-disable-next-line react/prop-types
            error={changePasswordError.password}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

ChagePassScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Change Password',
    headerRight: (
      <TouchableOpacity
        style={styles.saveButtonTouchable}
        onPress={() => {
          // handleSave
          const {currentPassword, newPassword, changePassword} = navigation.state.params;
          changePassword(currentPassword, newPassword);
        }}>
        <Text onPress style={styles.saveButton}>
          Save
        </Text>
      </TouchableOpacity>
    ),
  };
};

ChagePassScreen.propTypes = {
  navigation: PropTypes.shape({
    setParams: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
  changePassword: PropTypes.func.isRequired,
  changePasswordError: PropTypes.shape({
    password: PropTypes.string,
  }),
};

ChagePassScreen.defaultProps = {
  changePasswordError: {
    password: '',
  },
};

export default ChagePassScreen;
