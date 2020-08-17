/* eslint-disable import/no-named-as-default-member */
import { put, call } from 'redux-saga/effects';
import { Platform } from 'react-native';
import { Auth } from 'aws-amplify';
import { check, PERMISSIONS } from 'react-native-permissions';
import validator from 'validator';
import ValidatorService from '../Services/Validators';
import Authentication from '../Redux/AuthenticationRedux';
import UsersCreators from '../Redux/UsersRedux';
import NavigationService from '../Services/NavigationService';
import eventEmitter from '../Services/EventEmitter';

function* doSignin({ user, password }) {
  yield put(Authentication.signinFailed({ email: '', password: '' }));

  if (!validator.isEmail(user)) {
    yield put(
      Authentication.signinFailed({
        email: 'INVALID EMAIL ADDRESS',
      })
    );
    return;
  }

  try {
    yield put(Authentication.signinLoading(true));

    const response = yield call([Auth, Auth.signIn], user, password);
    if (response) {
      if (response.challengeName === 'NEW_PASSWORD_REQUIRED') {
        yield call(NavigationService.navigate, 'CreatePassScreen', { user: response });
      } else {
        if (response.attributes) {
          yield put(
            Authentication.setUser({
              name: `${response.attributes.given_name} ${response.attributes.family_name}`,
              email: response.attributes.email,
              phone_number: response.attributes.phone_number,
              id: response.attributes.sub,
            })
          );
        }
        yield put(Authentication.signinSuccess());  
        yield call(NavigationService.navigate, 'Main');
        yield put(UsersCreators.getUser());
      }
    }
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    }
  } finally {
    yield put(Authentication.signinLoading(false));
  }
}

function* doCreatePassword({ user, password }) {
  yield put(Authentication.createPasswordFailed(''));
  const strongPasswordError = ValidatorService.validateStrongPassword(password);

  if (!strongPasswordError) {
    try {
      yield put(Authentication.createPasswordLoading(true));
      const response = yield call([Auth, Auth.completeNewPassword], user, password, {});
      if (response) {
        if (response.challengeParam && response.challengeParam.userAttributes) {
          const userData = response.challengeParam.userAttributes;
          const { phone_number, given_name, family_name, email } = userData;
          yield put(
            Authentication.setUser({
              name: `${given_name} ${family_name}`,
              email,
              phone_number,
              id: response.username,
            })
          );
        }
        yield put(Authentication.signinSuccess());  
        yield call(NavigationService.navigate, 'Main');
        yield put(UsersCreators.getUser());
      }
    } catch (error) {
    } finally {
      yield put(Authentication.createPasswordLoading(false));
    }
  } else {
    yield put(Authentication.createPasswordFailed(strongPasswordError));
  }
}

function* doUpdateUserInformation({ userInfo }) {
  yield put(Authentication.updateUserInformationFailed({ email: '', phone_number: '' }));

  const { email, phone_number } = userInfo;

  // check email
  if (email) {
    if (!validator.isEmail(email)) {
      yield put(
        Authentication.updateUserInformationFailed({
          email: 'INVALID EMAIL ADDRESS',
        })
      );
      return;
    }
  }

  // check password
  if (phone_number) {
    const regx = /^\+?[0-9]?([0-9]{10})$/;
    if (!regx.test(phone_number)) {
      yield put(
        Authentication.updateUserInformationFailed({
          phone_number: 'INVALID PHONE NUMBER',
        })
      );
      return;
    }
  }

  yield put(Authentication.updateUserInformationLoading(true));
  try {
    const user = yield call([Auth, Auth.currentAuthenticatedUser]);
    const result = yield call([Auth, Auth.updateUserAttributes], user, userInfo);
    if (result) {
      yield put(Authentication.setUser(userInfo));
      NavigationService.goBack();
    }
  } catch (error) {
    
  } finally {
    yield put(Authentication.updateUserInformationLoading(false));
  }
}

function* doChangePassword({ oldPassword, newPassword }) {
  yield put(Authentication.changePasswordFailed({ password: '' }));
  const strongPasswordError = ValidatorService.validateStrongPassword(newPassword);

  if (!strongPasswordError) {
    yield put(Authentication.changePasswordLoading(true));
    try {
      const user = yield call([Auth, Auth.currentAuthenticatedUser]);
      yield call([Auth, Auth.changePassword], user, oldPassword, newPassword);
      NavigationService.goBack();
    } catch (error) {
      
    } finally {
      yield put(Authentication.changePasswordLoading(false));
    }
  } else {
    yield put(Authentication.changePasswordFailed({ password: strongPasswordError }));
    
  }
}

function* doForgotPassword({username}) {
  yield put(Authentication.setForgotPasswordLoading(true));
  try {
    const result = yield call([Auth, Auth.forgotPassword], username);
    
    if (result) {
      if (result.CodeDeliveryDetails) {
        let successData = result.CodeDeliveryDetails;
        successData.username = username;
        yield put(Authentication.forgotPasswordSuccess(successData));
        NavigationService.navigate(`PasswordResetScreen`);
      } else {
        eventEmitter.emit('showNotification', `Unexpected error occurred`);
      }
    }
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    } else {
      eventEmitter.emit('showNotification', `Unexpected error occurred`);
    }
  } finally {
    yield put(Authentication.setForgotPasswordLoading(false));
  }
}

function* doResetPassword({ username, code, password }) {
  yield put(Authentication.setForgotPasswordLoading(true));
  try {
    yield call([Auth, Auth.forgotPasswordSubmit], username, code, password);
    NavigationService.popToTop();
    eventEmitter.emit('showNotification', `Your password was changed succesfully`);
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    } else {
      eventEmitter.emit('showNotification', `Unexpected error occurred`);
    }
  } finally {
    yield put(Authentication.setForgotPasswordLoading(false));
  }
}

export default {
  doSignin,
  doCreatePassword,
  doUpdateUserInformation,
  doChangePassword,
  doForgotPassword,
  doResetPassword,
};
