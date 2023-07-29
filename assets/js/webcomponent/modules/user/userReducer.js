import { cloneDeep, extend, isPlainObject, isEmpty, isArray } from 'lodash';

import { UPDATE_LOGIN_ATTR, DO_LOGIN, DO_LOGIN_SUCCESS, DO_LOGIN_FAILURE, UPDATE_SIGNUP_ATTR, DO_SIGNUP, DO_SIGNUP_SUCCESS, DO_SIGNUP_FAILURE, DO_LOGOUT } from '../../constants/actionTypes';
import auth from '../../utils/auth';
import { history } from '../../store/configureStore';

const initialState = {
  data: {
    token: '',
    username: '',
    email: '',
    firstname: '',
    lastname: ''
  },
  login: {
    data: {
      username: '',
      password: ''
    },
    errMsg: '',
    errors: {}
  },
  signup: {
    data: {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: ''
    },
    errMsg: '',
    errors: {}
  }
};

const getInitialState = (user) => {
  user = cloneDeep(user);
  const authUser = cloneDeep(auth.getUser());
  if (isEmpty(user.data.token) && !isEmpty(authUser)) {
    user.data = authUser;
  }
  return user;
};

export default function appReducer(state = getInitialState(initialState), action) {
  switch (action.type) {
    case UPDATE_LOGIN_ATTR: {
      const newState = cloneDeep(state);
      newState.login.data[action.field] = action.value;
      return newState;
    }

    case DO_LOGIN: {
      const newState = cloneDeep(initialState);
      newState.login.data = state.login.data;
      return newState;
    }

    case DO_LOGIN_SUCCESS: {
      const newState = cloneDeep(state);
      const data = action.data && action.data.data;
      if (!isEmpty(data) && isPlainObject(data)) {
        newState.data = extend(cloneDeep(initialState.data), { token: data.token }, data.user);
        auth.setUser(newState.data);
        newState.login = cloneDeep(initialState.login);
        setTimeout(() => {
          history.push('/');
        }, 200);
      }
      return newState;
    }

    case DO_LOGIN_FAILURE: {
      const newState = cloneDeep(state);
      const data = isPlainObject(action.data) ? action.data : {};
      const additionalInfo = data.additionalInfo;
      newState.login.errMsg = data.message || 'generic.server_error_msg';
      if (isArray(additionalInfo)) {
        additionalInfo.forEach((d) => {
          if (d && d.param) {
            newState.login.errors[d.param] = d.msg || '';
          }
        });
      }
      return newState;
    }

    case UPDATE_SIGNUP_ATTR: {
      const newState = cloneDeep(state);
      newState.signup.data[action.field] = action.value;
      return newState;
    }

    case DO_SIGNUP: {
      const newState = cloneDeep(initialState);
      newState.signup.data = state.signup.data;
      return newState;
    }

    case DO_SIGNUP_SUCCESS: {
      const newState = cloneDeep(state);
      const data = action.data && action.data.data;
      if (!isEmpty(data) && isPlainObject(data)) {
        newState.signup = cloneDeep(initialState.signup);
        setTimeout(() => {
          history.push('/login');
        }, 200);
      }
      return newState;
    }

    case DO_SIGNUP_FAILURE: {
      const newState = cloneDeep(state);
      const data = isPlainObject(action.data) ? action.data : {};
      const additionalInfo = data.additionalInfo;
      newState.signup.errMsg = data.message || 'generic.server_error_msg';
      if (isArray(additionalInfo)) {
        additionalInfo.forEach((d) => {
          if (d && d.param) {
            newState.signup.errors[d.param] = d.msg || '';
          }
        });
      }
      return newState;
    }

    case DO_LOGOUT: {
      return cloneDeep(initialState);
    }

    default:
      return state;
  }
}
