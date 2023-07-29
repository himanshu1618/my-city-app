'use strict';

import { isPlainObject, isEmpty } from 'lodash';
import browserStorage from './browserStorage';

const userKey = 'mycity_v1_user';

class Auth {

  constructor() {
    this.user = {};
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  getToken() {
    return this.getUser().token || null;
  }

  getUser() {
    if (!isEmpty(this.user)) {
      return this.user;
    }

    try {
      const user = JSON.parse(browserStorage.getItem(userKey));
      if (isPlainObject(user)) {
        this.user = user;
      }
    } catch (e) {}

    return this.user || {};
  }

  setUser(user) {
    this.user = isPlainObject(user) ? user : {};
    browserStorage.setItem(userKey, JSON.stringify(this.user));
  }

  deleteUser() {
    this.user = null;
    browserStorage.removeItem(userKey);
  }

}

const auth = new Auth();

(() => {
  const user = auth.getUser();
  if (isPlainObject(user)) {
    auth.setUser(user);
  }
})();

export default auth;
