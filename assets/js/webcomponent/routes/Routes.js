import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import auth from '../utils/auth';

import ConnectedLoginContainer from '../modules/user/components/LoginContainer';
import ConnectedSignUpContainer from '../modules/user/components/SignUpContainer';
import ConnectedLogout from '../modules/user/components/Logout';
import ConnectedMyCitiesContainer from '../modules/mycity/components/MyCitiesContainer';
import ConnectedEditMyCityContainer from '../modules/mycity/components/EditMyCityContainer';

import NotFound from '../components/NotFound';
import PrivateRoute from './PrivateRoute';
import PrivateUserRoute from './PrivateUserRoute';

class Routes extends React.Component {
  render() {
    const isAuthed = auth.isAuthenticated();

    return (
      <Switch>
        <Redirect exact from='/' to={isAuthed ? '/auth' : '/logout'} />
        <PrivateRoute exact path='/auth' authed={isAuthed} defaultHomePath='/mycities' />

        <Route exact path='/login' component={ConnectedLoginContainer} />
        <Route exact path='/signup' component={ConnectedSignUpContainer} />
        <Route exact path='/logout' component={ConnectedLogout} />

        <PrivateUserRoute exact path='/mycities' authed={isAuthed} component={ConnectedMyCitiesContainer} />
        <PrivateUserRoute exact path='/mycities/:id' authed={isAuthed} component={ConnectedEditMyCityContainer} />

        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
