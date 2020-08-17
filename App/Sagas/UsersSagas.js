/* eslint-disable import/no-named-as-default-member */
import { put, call, select } from 'redux-saga/effects';
import UsersCreators from '../Redux/UsersRedux';
import eventEmitter from '../Services/EventEmitter';
import { AuthenticationSelectors } from '../Redux/AuthenticationRedux';
import NavigationService from '../Services/NavigationService';
import stripe from 'tipsi-stripe';

function showErrorOrDefaultError(response) {
  if (response && response.data && response.data.error && response.data.error.message) {
    eventEmitter.emit('showNotification', response.data.error.message);
  } else {
    eventEmitter.emit('showNotification', 'An unexpected error occurred');
  }
}

function userIsMissingProfileInfo(user) {

  const hasPopColor = user.pop_colors && user.pop_colors.length > 0;
  const hasProfilePicture = user.profile_picture && user.profile_picture.length > 0;
  const hasBio = user.bio && user.bio.length > 0;

  return !hasPopColor || !hasProfilePicture || !hasBio;
}

function* getUser(api) {
  try {
    const userId = yield select(AuthenticationSelectors.selectUserId);

    let parameters = { userId };

    let response;

    if (parameters) {
      yield put(UsersCreators.setUserLoading(true));
      response = yield api.request([api.users, api.users.getUser], parameters);
    }

    if (response) {
      if (response.ok) {
        yield put(UsersCreators.getUserSuccess(response.data));
        if (response.data.verification_status === `unverified`) {
          if (!NavigationService.currentRouteName().startsWith(`VerificationBlocker`)) {
            yield call(NavigationService.navigate, 'VerificationBlockerScreen');
          }
        } else if (response.data.verification_status === `pending`) {
          yield call(NavigationService.navigate, 'VerificationBlockerPendingScreen');
        } else if (!response.data.bank_accounts || response.data.bank_accounts.length == 0) {
          yield call(NavigationService.navigate, 'BankAccountBlocker');
        } else if (userIsMissingProfileInfo(response.data) && 
          !NavigationService.currentRouteName().startsWith(`ShiningStar`)) {
          yield call(NavigationService.navigate, 'ShiningStarModal');
        }
      } else {
        showErrorOrDefaultError(response);
      }
    } else {
      showErrorOrDefaultError();
    }
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    }
  } finally {
    yield put(UsersCreators.setUserLoading(false));
  }
}

function* updateWasherPicture(api, {profilePictureData}) {
  try {
    
    let parameters = { 
      body: profilePictureData
     };

    let response;

    if (parameters) {
      yield put(UsersCreators.updateProfilePictureLoading(true));
      response = yield api.request([api.users, api.users.updateWasherPicture], parameters);
    }

    if (response) {
      if (response.ok) {
        yield put(UsersCreators.updateProfilePictureSuccess(response.data));
      } else {
        showErrorOrDefaultError(response);
      }
    } else {
      showErrorOrDefaultError();
    }
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    }
  } finally {
    yield put(UsersCreators.updateProfilePictureLoading(false));
  }
}

function* deleteWasherPicture(api, { profilePictureData }) {
  try {
    let parameters = {
      body: profilePictureData,
    };

    let response;

    if (parameters) {
      yield put(UsersCreators.deleteProfilePictureLoading(true));
      response = yield api.request(
        [api.users, api.users.removeWasherPicture],
        parameters,
      );
    }

    if (response) {
      if (response.ok) {
        yield put(UsersCreators.deleteProfilePictureSuccess(response.data));
      } else {
        showErrorOrDefaultError(response);
      }
    } else {
      showErrorOrDefaultError();
    }
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    }
  } finally {
    yield put(UsersCreators.deleteProfilePictureLoading(false));
  }
}

function* updateUser(api, { userData, navigateBack }) {
  try {

    let parameters = {
      body: userData,
    };

    let response;

    if (parameters) {
      yield put(UsersCreators.updateUserLoading(true));
      response = yield api.request(
        [api.users, api.users.updateWasherInfo],
        parameters,
      );
    }

    if (response) {
      if (response.ok) {
        yield put(UsersCreators.updateUserSuccess(response.data));

        if (navigateBack) {
          yield call(NavigationService.goBack);
        }
      } else {
        showErrorOrDefaultError(response);
      }
    } else {
      showErrorOrDefaultError();
    }
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    }
  } finally {
    yield put(UsersCreators.updateUserLoading(false));
  }
}

function* setBankAccountAsDefault(api, { bankAccountId }) {
  try {
    let parameters = {
      bankAccountId,
      body: { is_default: true }
    };

    let response;

    if (parameters) {
      yield put(UsersCreators.updateUserLoading(true));
      response = yield api.request(
        [api.users, api.users.updateBankAccount],
        parameters,
      );
    }

    if (response) {
      if (response.ok) {
        yield put(UsersCreators.updateUserSuccess(response.data));

      } else {
        showErrorOrDefaultError(response);
      }
    } else {
      showErrorOrDefaultError();
    }
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    }
  } finally {
    yield put(UsersCreators.updateUserLoading(false));
  }
}

function* deleteBankAccount(api, { bankAccountId, navigateBack }) {
  
  try {
    let parameters = {
      bankAccountId,
    };

    let response;

    if (parameters) {
      yield put(UsersCreators.updateUserLoading(true));
      response = yield api.request(
        [api.users, api.users.deleteBankAccount],
        parameters,
      );
    }

    if (response) {
      if (response.ok) {
        yield put(UsersCreators.updateUserSuccess(response.data));

        if (navigateBack) {
          yield call(NavigationService.goBack);
        }
      } else {
        showErrorOrDefaultError(response);
      }
    } else {
      showErrorOrDefaultError();
    }
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    }
  } finally {
    yield put(UsersCreators.updateUserLoading(false));
  }
}

function* getStripeAccountLink(api) {
  try {
    let parameters = { };

    let response;

    if (parameters) {
      yield put(UsersCreators.setStripeAccountLinkLoading(true));
      response = yield api.request([api.users, api.users.getAccountLink], parameters);
    }

    if (response) {
      if (response.ok) {
        yield put(UsersCreators.getStripeAccountLinkSuccess(response.data));
      } else {
        showErrorOrDefaultError(response);
      }
    } else {
      showErrorOrDefaultError();
    }
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    }
  } finally {
    yield put(UsersCreators.setStripeAccountLinkLoading(false));
  }
}

function* addBankAccount(api, { tokenId, navigateBack }) {
  try {
    
    let parameters = {
      body: {
        bank_account_token: tokenId,
        is_default: true,
      },
    };

    let response;

    if (parameters) {
      yield put(UsersCreators.setAddBankAccountLoading(true));
      response = yield api.request([api.users, api.users.addBankAccount], parameters);
    }

    if (response) {
      if (response.ok) {
        yield put(UsersCreators.addBankAccountSuccess(response.data));

        if (navigateBack) {
          NavigationService.goBack()
        }
      } else {
        showErrorOrDefaultError(response);
      }
    } else {
      showErrorOrDefaultError();
    }
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    }
  } finally {
    yield put(UsersCreators.setAddBankAccountLoading(false));
  }
}

function* updateStripeAccountInfo(
  api,
  { base64Image, mimetype, last4SSN, dateOfBirth },
) {
  try {
    let parameters = {
      body: {
        identityDoc_base64: base64Image,
        identityDoc_mimetype: mimetype,
        dob: dateOfBirth,
        last4ssn: last4SSN,
      },
    };

    let response;
    let config = {};

    if (parameters) {
      yield put(UsersCreators.setUpdateStripeAccountInfoLoading(true));
      response = yield api.request(
        [api.users, api.users.updatePaymentsAccount],
        parameters,
        config,
      );
    }

    if (response) {
      if (response.ok) {
        yield put(UsersCreators.updateStripeAccountInfoSuccess(response.data));
      } else {
        showErrorOrDefaultError(response);
      }
    } else {
      showErrorOrDefaultError();
    }
  } catch (error) {
    if (error.message) {
      eventEmitter.emit('showNotification', error.message);
    }
  } finally {
    yield put(UsersCreators.setUpdateStripeAccountInfoLoading(false));
  }
}

export default {
  getUser,
  getStripeAccountLink,
  addBankAccount,
  updateStripeAccountInfo,
  updateWasherPicture,
  deleteWasherPicture,
  deleteBankAccount,
  setBankAccountAsDefault,
  updateUser
};
