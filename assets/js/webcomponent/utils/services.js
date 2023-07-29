'use strict';

import { create, CancelToken } from 'apisauce';

import auth from './auth';

export const APP_BASE_URI = (location.host.indexOf('localhost') !== -1) ? 'http://localhost:8080' : '';

// Default API root is same server, same protocol
const API_ROOT = APP_BASE_URI + '/api/v1';

// access to our main API
export const api = create({
  baseURL: API_ROOT
});

export const cancelTokenSource =  CancelToken.source;

export const setAuthHeader = (token) => {
  api.setHeader('Authorization', 'Bearer ' + token);
};

export const removeAuthHeader = () => {
  api.deleteHeader('Authorization');
};

api.addMonitor((response) => {
  if (response && ((response.status === 401) || (response.status === 403))) {
    auth.deleteToken();

    //window.location.reload();
    if (history.pushState) {
      history.pushState(null, null, '#');
    } else {
      location.hash = '#';
    }
    return;
  }
});

api.addRequestTransform(request => {
  const bustParam = (request.url.indexOf('?') === -1 ? '?' : '&') + '_=' + Date.now();
  request.url += bustParam;
});
