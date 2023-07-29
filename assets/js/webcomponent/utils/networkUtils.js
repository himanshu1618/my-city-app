'use strict';
import { extend } from 'lodash';
import { wrapCall } from './serviceUtils';
import { api } from './services';
import auth from './auth';

export const REQUEST = {
  HEAD: 'head',
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
};

export const sendRequest = function(action, method, url, data, config, actionData) {
  const token = auth.getToken();
  if (token) {
    config = extend({}, config, { headers: { Authorization: `Bearer ${token}` } });
  }

  switch (method) {
    case REQUEST.HEAD:
    case REQUEST.GET:
    case REQUEST.POST:
    case REQUEST.PUT:
    case REQUEST.PATCH:
    case REQUEST.DELETE: {
      return wrapCall(
        api[method](url, data, config),
        action,
        { payload: data, actionData }
      );
    }
  }

};
