import { UPDATE_MY_CITY_PROPERTY, VALIDATE_MY_CITY_PROPERTY, RESET_MY_CITY_DATA, FETCH_MY_CITIES, FETCH_MY_CITIES_PAGINATED, FETCH_MY_CITY, UPDATE_MY_CITY, DELETE_MY_CITY } from '../../constants/actionTypes';
import { REQUEST, sendRequest } from '../../utils/networkUtils';

export const updateMyCityProperty = (field, value) => {
  return {
    type: UPDATE_MY_CITY_PROPERTY,
    field,
    value
  };
};

export const validateMyCityProperty = (field, value) => {
  return {
    type: VALIDATE_MY_CITY_PROPERTY,
    field,
    value
  };
};

export const resetMyCityData = (fields) => {
  return {
    type: RESET_MY_CITY_DATA,
    fields
  };
};

export const fetchMyCities = (limit = 10) => {
  return sendRequest(FETCH_MY_CITIES, REQUEST.GET, `/mycity?limit=${limit}`);
};

export const fetchMyCitiesPaginated = (page, limit, sort, startDate, endDate) => {
  return sendRequest(FETCH_MY_CITIES_PAGINATED, REQUEST.GET, `/mycity/paginate?page=${page}&limit=${limit}&sort=${sort}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`);
};

export const fetchMyCity = (id) => {
  return sendRequest(FETCH_MY_CITY, REQUEST.GET, `/mycity/${id}`);
};

export const updateMyCity = (id, data) => {
  return sendRequest(UPDATE_MY_CITY, REQUEST.PUT, `/mycity/${id}`, data);
};

export const deleteMyCity = (id) => {
  return sendRequest(DELETE_MY_CITY, REQUEST.DELETE, `/mycity/${id}`);
};
