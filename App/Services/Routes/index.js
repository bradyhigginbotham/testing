/*jshint esversion: 6 */
import apisauce from 'apisauce';
import qs from 'query-string';

/**
 * This is the api for the washr app for Hampr.
 * @class RouteApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
let RouteApi = (function() {
  'use strict';
  let api;

  function RouteApi(baseURL, headers) {
    if (baseURL.length === 0) {
      throw new Error('baseUrl parameter must be specified as a string.');
    }

    this.api = apisauce.create({
      // base URL is read from the "constructor"
      baseURL,
      // here are some default headers
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      //TODO change back to 10 second timeout...
      timeout: 30000,
    });

    if (headers) {
      this.api.setHeaders(headers);
    }
  }

  /**
   * HTTP Request
   * @method
   * @name RouteApi#request
   * @param {string} method - http method
   * @param {string} url - url to do request
   * @param {object} body - body parameters / object
   * @param {object} queryParameters - querystring parameters
   * @param {object} form - form data object
   * @param {object} config - axio config object
   */
  RouteApi.prototype.request = function(
    method,
    url,
    body,
    queryParameters,
    form,
    config,
  ) {
    method = method.toLowerCase();
    let keys = Object.keys(queryParameters);
    let queryUrl = url;
    if (keys.length > 0) {
      queryUrl = url + '?' + qs.stringify(queryParameters);
    }

    if (body && !Object.keys(body).length) {
      body = undefined;
    }

    if (!config) {
      config = {};
    }

    if (body) {
      return this.api[method](queryUrl, body, config);
    } else {
      return this.api[method](queryUrl, qs.stringify(form), config);
    }
  };

  /**
   * Update order item status.
   * @method
   * @name RouteApi#getRoute
   * @param {object} parameters - method options and parameters
   * @param {string} parameters.washrId - ID for the user
   * @param {number} parameters.vehicleCapacity - Total capacity for the vehicle
   * @param {number} parameters.startingCapacity - How many Hamprs the car starts with
   * @param {array} parameters.destinations - Array with all dropoff / pickups
   * @param {object} parameters.washrLocation - Coordinates to start the route
   */
  RouteApi.prototype.getRoute = function(parameters, config) {
    if (parameters === undefined) {
      parameters = {};
    }
    let path = '/get-route';
    let body = {},
      queryParameters = {},
      form = {};

    if (
      parameters['washrId'] !== undefined &&
      parameters['vehicleCapacity'] !== undefined &&
      parameters['startingCapacity'] !== undefined &&
      parameters['washrLocation'] !== undefined &&
      parameters['destinations'] !== undefined
    ) {
      body = parameters;
    }

    return this.request('POST', path, body, queryParameters, form, config);
  };

  /**
   * Update order item status.
   * @method
   * @name RouteApi#recoverRoute
   * @param {object} parameters - method options and parameters
   * @param {string} parameters.washrId - ID for the user
   */
  RouteApi.prototype.recoverRoute = function(parameters, config) {
    if (parameters === undefined) {
      parameters = {};
    }
    let path = '/recover';
    let body = {},
      queryParameters = {},
      form = {};

    if (parameters['washrId'] !== undefined) {
      queryParameters['washrId'] = parameters['washrId'];
    }

    return this.request('GET', path, body, queryParameters, form, config);
  };

  return RouteApi;
})();

exports.RouteApi = RouteApi;
