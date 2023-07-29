import {
  FETCH_TRANSLATIONS,
  FETCH_CITIES,
  FETCH_STATUSES
} from '../../constants/actionTypes';
import constants from '../../constants';
import { REQUEST, sendRequest } from '../../utils/networkUtils';

export const fetchTranslation = (locale = constants.app.defaultLocale) => {
  return sendRequest(FETCH_TRANSLATIONS, REQUEST.GET, `/translation?locale=${locale}`, { locale });
};

export const fetchCities = () => {
  return sendRequest(FETCH_CITIES, REQUEST.GET, `/city`);
};

export const fetchStatuses = () => {
  return sendRequest(FETCH_STATUSES, REQUEST.GET, `/status`);
};
