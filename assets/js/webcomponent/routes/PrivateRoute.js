import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import auth from '../utils/auth';

export default function PrivateRoute({ ...rest }) {
  const isAuthed = auth.isAuthenticated();

  return (
    <Route
      {...rest}
      render={(props) => isAuthed === true
        ? <Redirect to={{ pathname: rest.defaultHomePath || '/mycities', state: { from: props.location } }} />
        : <Redirect to={{ pathname: '/logout', state: { from: props.location } }} />}
    />
  );
}

PrivateRoute.propTypes = {
  defaultHomePath: PropTypes.string,
  authed: PropTypes.bool,
  location: PropTypes.object
};
