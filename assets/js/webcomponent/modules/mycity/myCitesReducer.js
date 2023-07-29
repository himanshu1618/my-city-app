import { cloneDeep, isPlainObject, isEmpty } from 'lodash';

import {
  FETCH_MY_CITIES_PAGINATED,
  FETCH_MY_CITIES_PAGINATED_SUCCESS,
  FETCH_MY_CITIES_PAGINATED_FAILURE,
  FETCH_MY_CITY,
  FETCH_MY_CITY_SUCCESS,
  FETCH_MY_CITY_FAILURE,
  DO_LOGOUT
} from '../../constants/actionTypes';
import constants from '../../constants';

const initialState = {
  errMsg: '',
  paginated: {
    data: [],
    perPage: constants.table.perPage,
    page: constants.table.page,
    sort: '',
    totalSize: 0
  },
  mycity: {
    data: {
    },
    errMsg: '',
    errors: {}
  }
};

export default function myCitesReducer(state = cloneDeep(initialState), action) {
  switch (action.type) {
    case FETCH_MY_CITIES_PAGINATED: {
      const newState = cloneDeep(state);
      newState.errMsg = '';
      return newState;
    }

    case FETCH_MY_CITIES_PAGINATED_SUCCESS: {
      const data = isPlainObject(action.data) && action.data && action.data.data;
      const newState = cloneDeep(state);
      if (!isEmpty(data)) {
        newState.paginated.data = data.items;
        newState.paginated.page = (data.page + 1);
        newState.paginated.perPage = data.limit;
        newState.paginated.totalSize = data.total;
        newState.paginated.sort = data.sort;
      }
      return newState;
    }

    case FETCH_MY_CITIES_PAGINATED_FAILURE: {
      const newState = cloneDeep(state);
      if (action.data && action.data.message) {
        newState.errMsg = action.data.message;
      } else {
        newState.errMsg = 'generic.server_error_msg';
      }
      return newState;
    }

    case FETCH_MY_CITY: {
      const newState = cloneDeep(state);
      newState.mycity = cloneDeep(initialState.mycity);
      return newState;
    }

    case FETCH_MY_CITY_SUCCESS: {
      const newState = cloneDeep(state);
      const data = action.data && action.data.data;
      if (!isEmpty(data) && isPlainObject(data)) {
        newState.mycity.data = data;
      }
      return newState;
    }

    case FETCH_MY_CITY_FAILURE: {
      const newState = cloneDeep(state);
      if (action.data && action.data.message) {
        newState.mycity.errMsg = action.data.message;
      } else {
        newState.mycity.errMsg = 'generic.server_error_msg';
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
