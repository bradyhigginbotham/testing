import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getUser: ['userId'],
  getUserSuccess: ['user'],
  setUserLoading: ['loading'],

  getStripeAccountLink: ['userId'],
  getStripeAccountLinkSuccess: ['link'],
  setStripeAccountLinkLoading: ['loading'],

  addBankAccount: ['tokenId', 'navigateBack'],
  deleteBankAccount: ['bankAccountId', 'navigateBack'],
  setBankAccountAsDefault: ['bankAccountId'],
  addBankAccountSuccess: ['user'],
  setAddBankAccountLoading: ['loading'],

  setProfilePicture: ['source'],
  updateProfilePicture: ['profilePictureData'],
  updateProfilePictureSuccess: ['user'],
  updateProfilePictureLoading: ['loading'],

  deleteProfilePicture: [],
  deleteProfilePictureSuccess: ['user'],
  deleteProfilePictureLoading: ['loading'],

  updateUser: ['userData', 'navigateBack'],
  updateUserSuccess: ['user'],
  updateUserLoading: ['loading'],

  updateStripeAccountInfo: [
    `base64Image`,
    `mimetype`,
    `last4SSN`,
    `dateOfBirth`,
  ],
  setUpdateStripeAccountInfoLoading: [`loading`],
  updateStripeAccountInfoSuccess: [`data`],
});

export const UsersTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
         user: undefined,
         userLoading: false,
         stripeAccountLink: undefined,
         stripeAccountLinkLoading: false,
         updateProfilePictureLoading: false,
         updateUserLoading: false,
         addBankAccountLoading: false,
         updateStripeAccountInfoLoading: false,
       });

/* ------------- Reducers ------------- */

export const getUserSuccess = (state, { user }) => state.merge({ user });

export const setUserLoading = (state, { loading }) => state.merge({ userLoading: loading });

export const getStripeAccountLinkSuccess = (state, { link }) => state.merge({ stripeAccountLink: link });

export const setStripeAccountLinkLoading = (state, { loading }) => state.merge({ stripeAccountLinkLoading: loading });

export const addBankAccountSuccess = (state, { user }) => state.merge({ user });

export const setAddBankAccountLoading = (state, { loading }) => state.merge({ addBankAccountLoading: loading });

export const setProfilePicture = (state, { source }) => {
  const user = JSON.parse(JSON.stringify(state.user))
  user.profile_picture = source;
  return state.merge({ user })
};

export const updateProfilePictureSuccess = (state, { user }) => state.merge({ user });

export const updateProfilePictureLoading = (state, { loading }) => state.merge({ updateProfilePictureLoading: loading });

export const deleteProfilePictureSuccess = (state, { user }) => state.merge({ user });

export const deleteProfilePictureLoading = (state, { loading }) => state.merge({ deleteProfilePictureLoading: loading });

export const updateUserSuccess = (state, { user }) => state.merge({ user });

export const updateUserLoading = (state, { loading }) => state.merge({ updateUserLoading: loading });

export const updateStripeAccountInfoSuccess = (state, { data }) =>
         state.merge({ user: data });

export const setUpdateStripeAccountInfoLoading = (state, { loading }) =>
         state.merge({ updateStripeAccountInfoLoading: loading });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_USER_SUCCESS]: getUserSuccess,
  [Types.SET_USER_LOADING]: setUserLoading,

  [Types.GET_STRIPE_ACCOUNT_LINK_SUCCESS]: getStripeAccountLinkSuccess,
  [Types.SET_STRIPE_ACCOUNT_LINK_LOADING]: setStripeAccountLinkLoading,

  [Types.ADD_BANK_ACCOUNT_SUCCESS]: addBankAccountSuccess,
  [Types.SET_ADD_BANK_ACCOUNT_LOADING]: setAddBankAccountLoading,

  [Types.SET_PROFILE_PICTURE]: setProfilePicture,
  [Types.UPDATE_PROFILE_PICTURE_SUCCESS]: updateProfilePictureSuccess,
  [Types.UPDATE_PROFILE_PICTURE_LOADING]: updateProfilePictureLoading,

  [Types.DELETE_PROFILE_PICTURE_SUCCESS]: deleteProfilePictureSuccess,
  [Types.DELETE_PROFILE_PICTURE_LOADING]: deleteProfilePictureLoading,

  [Types.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [Types.UPDATE_USER_LOADING]: updateUserLoading,

  [Types.SET_UPDATE_STRIPE_ACCOUNT_INFO_LOADING]: setUpdateStripeAccountInfoLoading,
  [Types.UPDATE_STRIPE_ACCOUNT_INFO_SUCCESS]: updateStripeAccountInfoSuccess,
});
