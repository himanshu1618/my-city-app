import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import '../../../../../styles/auth.scss';

import AlertBox from '../../../components/AlertBox';

import {
  updateLoginAttr,
  doLogin
} from '../userActions';

export class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this);
  }

  componentDidMount() {
    const { user, history } = this.props;
    if (user && user.data && user.data.token) {
      history && history.replace && history.replace('/');
    }
  }

  render() {
    const { user } = this.props;
    const errors = get(user, 'login.errors') || {};

    return (
      <div className='auth-wrapper'>
        <div className='auth-inner'>
          <Form>
            <h3>Sign In</h3>

            <div className='validation-msg'>
              {
                this.getValidationErrMsg()
              }
            </div>

            <FormGroup>
              <Form.Label htmlFor='username'>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter username'
                name='username'
                onChange={this.handleInputChange}
                required
                minLength='3'
                maxLength='12'
                isInvalid={errors.username}
              />
              <Form.Control.Feedback type='invalid'>
                {
                  errors.username && (
                    <FormattedMessage id={errors.username} defaultMessage='Required' />
                  )
                }
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup>
              <Form.Label htmlFor='password'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                name='password'
                onChange={this.handleInputChange}
                required
                maxLength='16'
                isInvalid={errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {
                  errors.password && (
                    <FormattedMessage id={errors.password} defaultMessage='Required' />
                  )
                }
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup controlId='customCheck1'>
              <Form.Check type='checkbox' label='Remember me' custom />
            </FormGroup>

            <button type='submit' className='btn btn-primary btn-block' onClick={this.handleClickSubmitButton}>
              Submit
            </button>
            <p className='forgot-password text-right'>
              Not a registered user? <Link to='/signup'>signup here</Link>
            </p>
          </Form>
        </div>
      </div>
    );
  }

  getValidationErrMsg() {
    const { user } = this.props;
    const err = user.login.errMsg
      ? user.login.errMsg
      : null;

    return err && (
      <AlertBox
        show
        variant='danger'
        dismissible={false}
        messageBody={err}
      />
    );
  }

  handleInputChange(e) {
    this.props.updateLoginAttr(e.target.name, e.target.value);
  }

  handleClickSubmitButton(e) {
    e && e.preventDefault && e.preventDefault();
    const { user } = this.props;
    const username = get(user, 'login.data.username');
    const password = get(user, 'login.data.password');
    this.props.doLogin({ username, password });
  }
}

LoginContainer.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
  updateLoginAttr: PropTypes.func,
  doLogin: PropTypes.func
};

export function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export const mapDispatchToProps = (dispatch) => {
  return {
    updateLoginAttr: (field, value) => dispatch(updateLoginAttr(field, value)),
    doLogin: (data) => dispatch(doLogin(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
