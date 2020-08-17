import { Auth } from 'aws-amplify';
import { call } from 'redux-saga/effects';

function setConfigAuth(config, token) {
  if (config === undefined) {
    config = {
      headers: {
        Authorization: ``,
      },
    };
  } else if (config.headers === undefined) {
    config.headers = { Authorization: `` };
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
}

class ApiFactory {
  constructor(build) {
    if (arguments && arguments.length === 1 && this.validateBuild(build)) {
      this.serviceIds = [];
      build.servicesArray.forEach(item => {
        this[item.id] = item.value;
        this.serviceIds.push(item.id);
      });
    }
  }

  validateBuild(build) {
    return String(build.constructor) === String(ApiFactory.Builder);
  }

  static get Builder() {
    class Builder {
      constructor(baseUrl, clientId, clientSecret, userType) {
        this.servicesArray = [];
      }
      registerService(name, service) {
        this.servicesArray.push({ id: name, value: service });
        return this;
      }
      build() {
        return new ApiFactory(this);
      }
    }
    return Builder;
  }

  async request(endpoint, params, config) {
    let authResponse = await Auth.currentSession();
    if (authResponse && authResponse.idToken) {
      config = {
        ...config,
        headers: {
          Authorization: authResponse.idToken.jwtToken
        }
      };

      const apiContext = endpoint[0];
      const apiCall = endpoint[1];

      return await apiCall.call(apiContext, params, config);
    } else {
      return authResponse;
    }
  }
}

export default ApiFactory;
