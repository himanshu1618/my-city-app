import { UPDATE_LOGIN_ATTR, DO_LOGIN, UPDATE_SIGNUP_ATTR, DO_SIGNUP, DO_LOGOUT } from '../../constants/actionTypes';
import { REQUEST, sendRequest } from '../../utils/networkUtils';

export const updateLoginAttr = (field, value) => {
  return {
    type: UPDATE_LOGIN_ATTR,
    field,
    value
  };
};

export const doLogin = (data) => {
  return sendRequest(DO_LOGIN, REQUEST.POST, `/login`, data);
};

export const updateSignupAttr = (field, value) => {
  return {
    type: UPDATE_SIGNUP_ATTR,
    field,
    value
  };
};

export const doSignup = (data) => {
  return sendRequest(DO_SIGNUP, REQUEST.POST, `/signup`, data);
};

export const doLogout = () => {
  return sendRequest(DO_LOGOUT, REQUEST.POST, `/logout`);
};
