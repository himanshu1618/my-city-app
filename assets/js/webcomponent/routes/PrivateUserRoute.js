import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import auth from '../utils/auth';

export default function PrivateUserRoute({ component: Component, ...rest }) {
  const isAuthed = auth.isAuthenticated();

  return (
    <Route
      {...rest}
      render={(props) => isAuthed === true
        ? (
          <div className='user-home-container'>
            <div className='user-sections'>
              <div className='user-main-section'>
                <Component {...props} />
              </div>
            </div>
          </div>
          )
        : <Redirect to={{ pathname: '/logout', state: { from: props.location } }} />}
    />
  );
}

PrivateUserRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]),
  authed: PropTypes.bool,
  history: PropTypes.object,
  location: PropTypes.object
};
