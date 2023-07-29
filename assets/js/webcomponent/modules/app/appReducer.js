import { cloneDeep, isEmpty, isArray, map } from 'lodash';

import {
  FETCH_TRANSLATIONS_SUCCESS,
  FETCH_CITIES_SUCCESS,
  FETCH_STATUSES_SUCCESS
} from '../../constants/actionTypes';
import constants from '../../constants';

const initialState = {
  locale: constants.app.defaultLocale,
  translations: {
    [constants.app.defaultLocale]: {}
  },
  cities: [],
  statuses: []
};

export default function appReducer(state = cloneDeep(initialState), action) {
  switch (action.type) {
    case FETCH_TRANSLATIONS_SUCCESS: {
      const newState = cloneDeep(state);
      const locale = action.payload && action.payload.locale;
      const translation = action.data && action.data.data;
      if (locale && !isEmpty(translation)) {
        newState.translations[locale] = translation;
      }
      return newState;
    }

    case FETCH_CITIES_SUCCESS: {
      const newState = cloneDeep(state);
      const cities = action.data && action.data.data;
      if (isArray(cities) && !isEmpty(cities)) {
        newState.cities = map(cities, (city) => {
          return { value: city.id, label: city.name };
        });
      }
      return newState;
    }

    case FETCH_STATUSES_SUCCESS: {
      const newState = cloneDeep(state);
      const statuses = action.data && action.data.data;
      if (isArray(statuses) && !isEmpty(statuses)) {
        newState.statuses = map(statuses, (status) => {
          return { value: status.id, label: status.name };
        });
      }
      return newState;
    }

    default:
      return state;
  }
}
