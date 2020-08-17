import { takeLatest, all, takeEvery } from 'redux-saga/effects';
import Amplify from 'aws-amplify';
import Config from 'react-native-config';
import { WashrApiAll } from 'washr-sdk-all';

import { RouteApi } from '../Services/Routes';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';
import StorageHelper from '../Services/StorageHelper.ts';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux';
import { AuthenticationTypes } from '../Redux/AuthenticationRedux';
import { OrdersTypes } from '../Redux/OrdersRedux';
import { RoutesTypes } from '../Redux/RoutesRedux';
import { UsersTypes } from '../Redux/UsersRedux';
import { EarningsTypes } from '../Redux/EarningsRedux';

/* ------------- Sagas ------------- */

import StartupSagas from './StartupSagas';
import AuthenticationSagas from './Authentication';
import OrdersSagas from './OrdersSagas';
import RoutesSagas from './RoutesSagas';
import UsersSagas from './UsersSagas';
import EarningsSagas from './EarningsSagas';

/* ------------- API ------------- */
import ApiFactory from '../Lib/APIFactory';

Amplify.configure({
  Auth: {
    userPoolId: Config.USER_POOL_ID,
    region: Config.REGION,
    userPoolWebClientId: Config.CLIENT_ID,
    storage: new StorageHelper().getStorage(),
  },
});

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const headers = {};
const api = DebugConfig.useFixtures
  ? FixtureAPI
  : new ApiFactory.Builder(Config.GATEWAY_URL, true)
      .registerService(`orders`, new WashrApiAll(Config.GATEWAY_URL, headers))
      .registerService(`users`, new WashrApiAll(Config.GATEWAY_URL, headers))
      .registerService(`routes`,new RouteApi(Config.ROUTES_GATEWAY_URL, headers))
      .registerService(`earnings`, new WashrApiAll(Config.GATEWAY_URL, headers))
      .build();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(StartupTypes.STARTUP, StartupSagas.startup),
    
    takeLatest(AuthenticationTypes.SIGNIN, AuthenticationSagas.doSignin),
    takeLatest(AuthenticationTypes.CREATE_PASSWORD, AuthenticationSagas.doCreatePassword),
    takeLatest(AuthenticationTypes.SIGNIN_SUCCESS, OrdersSagas.doFetchOrders, api),
    takeLatest(AuthenticationTypes.SIGNIN_SUCCESS, OrdersSagas.doFetchDeliveryOrders, api),
    takeLatest(AuthenticationTypes.CHANGE_PASSWORD, AuthenticationSagas.doChangePassword),
    takeLatest(AuthenticationTypes.UPDATE_USER_INFORMATION, AuthenticationSagas.doUpdateUserInformation),
    takeLatest(AuthenticationTypes.FORGOT_PASSWORD, AuthenticationSagas.doForgotPassword),
    takeLatest(AuthenticationTypes.RESET_PASSWORD, AuthenticationSagas.doResetPassword),

    takeLatest(OrdersTypes.FETCH_ORDERS, OrdersSagas.doFetchOrders, api),
    takeLatest(OrdersTypes.FETCH_DELIVERY_ORDERS, OrdersSagas.doFetchDeliveryOrders, api),
    takeEvery(OrdersTypes.CLAIM_ORDER, OrdersSagas.doClaimOrder, api),
    takeEvery(OrdersTypes.UPDATE_HAMPR_STATUS, OrdersSagas.updateOrderHamprStatus, api),
    takeEvery(OrdersTypes.REJECT_ORDER, OrdersSagas.rejectOrder, api),
    
    takeLatest(UsersTypes.GET_USER, UsersSagas.getUser, api),
    takeLatest(UsersTypes.GET_STRIPE_ACCOUNT_LINK, UsersSagas.getStripeAccountLink, api),
    takeLatest(UsersTypes.ADD_BANK_ACCOUNT, UsersSagas.addBankAccount, api),
    takeLatest(UsersTypes.DELETE_BANK_ACCOUNT, UsersSagas.deleteBankAccount, api),
    takeLatest(UsersTypes.SET_BANK_ACCOUNT_AS_DEFAULT, UsersSagas.setBankAccountAsDefault, api),
    takeLatest(UsersTypes.UPDATE_STRIPE_ACCOUNT_INFO, UsersSagas.updateStripeAccountInfo, api),
    takeLatest(UsersTypes.UPDATE_PROFILE_PICTURE, UsersSagas.updateWasherPicture, api),
    takeLatest(UsersTypes.DELETE_PROFILE_PICTURE, UsersSagas.deleteWasherPicture, api),
    takeLatest(UsersTypes.UPDATE_USER, UsersSagas.updateUser, api),
    
    takeEvery(RoutesTypes.GET_ROUTE, RoutesSagas.doGetRoute, api),
    takeEvery(RoutesTypes.RECOVER_ROUTE, RoutesSagas.doRecoverRoute, api),

    takeEvery(EarningsTypes.GET_PERFORMANCE, EarningsSagas.getPerformance, api)
  ]);
}
