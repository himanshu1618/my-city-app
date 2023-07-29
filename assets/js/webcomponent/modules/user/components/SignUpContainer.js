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
  updateSignupAttr,
  doSignup
} from '../userActions';

export class SignUpContainer extends React.Component {
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
    const errors = get(user, 'signup.errors') || {};

    return (
      <div className='auth-wrapper'>
        <div className='auth-inner'>
          <Form>
            <h3>Sign Up</h3>

            <div className='validation-msg'>
              {
                this.getValidationErrMsg()
              }
            </div>

            <FormGroup>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter first name'
                name='firstname'
                onChange={this.handleInputChange}
                required
                minLength='3'
                maxLength='24'
                isInvalid={errors.firstname}
              />
              <Form.Control.Feedback type='invalid'>
                {
                  errors.firstname && (
                    <FormattedMessage id={errors.firstname} defaultMessage='Required' />
                  )
                }
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter last name'
                name='lastname'
                onChange={this.handleInputChange}
                required
                minLength='3'
                maxLength='24'
                isInvalid={errors.lastname}
              />
              <Form.Control.Feedback type='invalid'>
                {
                  errors.lastname && (
                    <FormattedMessage id={errors.lastname} defaultMessage='Required' />
                  )
                }
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email'
                onChange={this.handleInputChange}
                required
                minLength='3'
                maxLength='128'
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type='invalid'>
                {
                  errors.email && (
                    <FormattedMessage id={errors.email} defaultMessage='Required' />
                  )
                }
              </Form.Control.Feedback>
            </FormGroup>

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

            <button type='submit' className='btn btn-primary btn-block' onClick={this.handleClickSubmitButton}>
              Sign Up
            </button>
            <p className='forgot-password text-right'>
              Already registered <Link to='/login'>sign in?</Link>
            </p>
          </Form>
        </div>
      </div>
    );
  }

  getValidationErrMsg() {
    const { user } = this.props;
    const err = user.signup.errMsg
      ? user.signup.errMsg
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
    this.props.updateSignupAttr(e.target.name, e.target.value);
  }

  handleClickSubmitButton(e) {
    e && e.preventDefault && e.preventDefault();
    const { user } = this.props;
    const firstname = get(user, 'signup.data.firstname');
    const lastname = get(user, 'signup.data.lastname');
    const email = get(user, 'signup.data.email');
    const username = get(user, 'signup.data.username');
    const password = get(user, 'signup.data.password');
    this.props.doSignup({ firstname, lastname, email, username, password });
  }
}

SignUpContainer.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
  updateSignupAttr: PropTypes.func,
  doSignup: PropTypes.func
};

export function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export const mapDispatchToProps = (dispatch) => {
  return {
    updateSignupAttr: (field, value) => dispatch(updateSignupAttr(field, value)),
    doSignup: (data) => dispatch(doSignup(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
