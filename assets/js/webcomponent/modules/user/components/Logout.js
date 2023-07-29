import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import auth from '../../../utils/auth';

import {
  doLogout
} from '../userActions';

class Logout extends React.Component {

  componentDidMount() {
    this.props.dispatch(doLogout());
    auth.deleteUser();

    setTimeout(() => {
      this.props.history.replace('/login');
    }, 400);
  }

  render() {
    return null;
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect()(Logout);
