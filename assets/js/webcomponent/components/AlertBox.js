'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import { FormattedMessage } from 'react-intl';

const variants = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark'
];

class AlertBox extends React.Component {

  componentDidMount() {
    this.ensureVisible();
  }

  render() {
    const { show, variant, dismissible, onClose } = this.props;

    if (!show) {
      return null;
    }

    return (
      <Alert
        variant={this.getVariant(variant)}
        dismissible={!!dismissible}
        onClose={onClose}
      >
        {
          this.renderChildren()
        }
      </Alert>
    );
  }

  renderChildren() {
    const { children, messageHeading, messageBody } = this.props;

    if (children) {
      return children;
    }

    return (
      <React.Fragment>
        {
          messageHeading
          ? (
            <Alert.Heading>
              <FormattedMessage id={messageHeading} defaultMessage='' />
            </Alert.Heading>
            )
          : null
        }
        <FormattedMessage id={messageBody} defaultMessage='' />
      </React.Fragment>
    );
  }

  getVariant(variant) {
    if (variants.indexOf(variant) !== -1) {
      return variant;
    }

    return variants[0];
  }

  ensureVisible() {
    if (this.props.show) {
      const elArr = document.getElementsByClassName('fade alert show');
      if (elArr && elArr.length > 0) {
        elArr[0].scrollIntoView && elArr[0].scrollIntoView();
      }
    }
  }

}

AlertBox.propTypes = {
  show: PropTypes.bool,
  dismissible: PropTypes.bool,
  variant: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  messageHeading: PropTypes.string,
  messageBody: PropTypes.string,
  onClose: PropTypes.func
};

export default AlertBox;
