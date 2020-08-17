import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Intercom from 'react-native-intercom';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setFirstTime: ['firstTime'],
  signin: ['user', 'password'],
  signinLoading: ['loading'],
  signinFailed: ['signinError'],
  signinSuccess: null,

  createPassword: ['user', 'password'],
  createPasswordLoading: ['loading'],
  createPasswordFailed: ['createPasswordError'],

  reset: null,

  setUser: ['userInformation'],

  updateUserInformation: ['userInfo'],
  updateUserInformationLoading: ['loading'],
  updateUserInformationFailed: ['updateUserInformationError'],

  changePassword: ['oldPassword', 'newPassword'],
  changePasswordLoading: ['loading'],
  changePasswordFailed: ['changePasswordError'],

  forgotPassword: ['username'],
  forgotPasswordSuccess: ['data'],
  resetPassword: ['username', 'code', 'password'],
  setForgotPasswordLoading: [`loading`],

  setLastUsedEmail: ['email'],
});

export const AuthenticationTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  firstTime: true,

  setUser: undefined,

  signinLoading: false,
  signinError: {},

  createPasswordLoading: false,
  createPasswordError: '',

  user: {},

  updateUserInformationError: {},
  updateUserInformationLoading: false,

  changePasswordError: {},
  changePasswordLoading: false,

  forgotPasswordSuccessData: {},
  forgotPasswordLoading: false,

  lastUsedEmail: ``,
});
 
export const AuthenticationSelectors = {
  selectUserId: state => state.authentication.user.id,
};

/* ------------- Reducers ------------- */

const setFirstTime = (state, { firstTime }) => state.merge({ firstTime });

const signinSuccess = state => state;

const signinLoading = (state, { loading }) => state.merge({ signinLoading: loading });
const signinFailed = (state, { signinError }) => state.merge({ signinError });

const createPasswordLoading = (state, { loading }) =>
  state.merge({ createPasswordLoading: loading });
const createPasswordFailed = (state, { createPasswordError }) =>
  state.merge({ createPasswordError });

const reset = state => {
  return state.merge({ ...INITIAL_STATE, firstTime: false, lastUsedEmail: state.lastUsedEmail });
};

const setUser = (state, { userInformation }) => {

  let user = state.user;

  if (!userInformation.id) {
    userInformation.id = user.id;
  }

  if(userInformation.email) {
    Intercom.registerIdentifiedUser({userId: userInformation.id});
    Intercom.updateUser({
      userId: userInformation.id,
      email: userInformation.email,
      name: userInformation.name,
      phone: userInformation.phone_number,
      custom_attributes: {
        app: `washr`,
      },
    });
  }
  return state.merge({ user: userInformation, lastUsedEmail: userInformation.email });
};

const updateUserInformationLoading = (state, { loading }) =>
  state.merge({ updateUserInformationLoading: loading });
const updateUserInformationFailed = (state, { updateUserInformationError }) =>
  state.merge({ updateUserInformationError });

const changePasswordLoading = (state, { loading }) =>
  state.merge({ changePasswordLoading: loading });
const changePasswordFailed = (state, { changePasswordError }) =>
  state.merge({ changePasswordError });

const forgotPasswordSuccess = (state, { data }) =>
  state.merge({forgotPasswordSuccessData: data});

const setForgotPasswordLoading = (state, { loading }) =>
  state.merge({ forgotPasswordLoading: loading });

const setLastUsedEmail = (state, { email }) =>
  state.merge({ lastUsedEmail: email });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER]: setUser,
  [Types.SET_FIRST_TIME]: setFirstTime,
  [Types.SIGNIN_LOADING]: signinLoading,
  [Types.SIGNIN_FAILED]: signinFailed,
  [Types.SIGNIN_SUCCESS]: signinSuccess,

  [Types.CREATE_PASSWORD_LOADING]: createPasswordLoading,
  [Types.CREATE_PASSWORD_FAILED]: createPasswordFailed,

  [Types.SET_USER]: setUser,

  [Types.RESET]: reset,

  [Types.UPDATE_USER_INFORMATION_LOADING]: updateUserInformationLoading,
  [Types.UPDATE_USER_INFORMATION_FAILED]: updateUserInformationFailed,

  [Types.CHANGE_PASSWORD_LOADING]: changePasswordLoading,
  [Types.CHANGE_PASSWORD_FAILED]: changePasswordFailed,

  [Types.FORGOT_PASSWORD_SUCCESS]: forgotPasswordSuccess,
  [Types.SET_FORGOT_PASSWORD_LOADING]: setForgotPasswordLoading,

  [Types.SET_LAST_USED_EMAIL]: setLastUsedEmail,
});
