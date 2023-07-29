import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import app from '../modules/app/appReducer';
import user from '../modules/user/userReducer';
import myCities from '../modules/mycity/myCitesReducer';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  app,
  user,
  myCities
});

export default rootReducer;
