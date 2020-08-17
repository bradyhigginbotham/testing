import { call, put } from 'redux-saga/effects';
import { Auth } from 'aws-amplify';
import Config from 'react-native-config';
import Intercom from 'react-native-intercom';

import OrderCreators from '../Redux/OrdersRedux';
import UsersCreators from '../Redux/UsersRedux';
import AuthenticationCreators from '../Redux/AuthenticationRedux';

function* startup() {
  try {
    
    let authResponse = yield Auth.currentAuthenticatedUser({
      bypassCache: false,
    });
    
    if (authResponse.username && authResponse.attributes) {

      yield put(OrderCreators.fetchDeliveryOrders());

      if (authResponse.attributes.sub) {      
        yield put(
          AuthenticationCreators.setUser({
            name: authResponse.attributes.given_name + ` ` + authResponse.attributes.family_name,
            email: authResponse.attributes.email,
            phone_number: authResponse.attributes.phone_number,
            id: authResponse.attributes.sub,
          })
        );

        yield put(UsersCreators.getUser());

        Intercom.registerIdentifiedUser({ userId: authResponse.attributes.sub});
        Intercom.updateUser({
          userId: authResponse.attributes.sub,
          email: authResponse.attributes.email,
          name: authResponse.attributes.given_name + ` ` + authResponse.attributes.family_name,
          phone: authResponse.attributes.phone_number,
          custom_attributes: {
            app: `Washer`,
          },
        });
      }

      
    }

  } catch (error) {
    
  }
};

export default {
  startup,
};
