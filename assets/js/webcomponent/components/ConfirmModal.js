'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FormattedMessage } from 'react-intl';

class ConfirmModal extends React.Component {

  constructor(props) {
    super(props);

    this.handleClickOk = this.handleClickOk.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleOnHide = this.handleOnHide.bind(this);
  }

  render() {
    const { show, bodyText, okButtonText, cancelButtonText } = this.props;

    return (
      <Modal id='confirmModal' show={show} onHide={this.handleOnHide} backdrop='static' keyboard>
        <Modal.Body>
          <FormattedMessage id={bodyText || 'confirm.are_you_sure'} defaultMessage='Are you sure?' />
        </Modal.Body>

        <Modal.Footer>
          <Button className='btn btn-default modal-ok-btn' variant='primary' onClick={this.handleClickOk}>
            <FormattedMessage id={okButtonText || 'generic.ok'} defaultMessage='Ok' />
          </Button>
          <Button className='btn btn-secondary modal-cancel-btn' variant='secondary' onClick={this.handleClickCancel}>
            <FormattedMessage id={cancelButtonText || 'generic.cancel'} defaultMessage='Cancel' />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  handleOnHide() {
    const { onClickCancel, data } = this.props;
    onClickCancel && onClickCancel(data);
  }

  handleClickOk() {
    const { onClickOk, data } = this.props;
    onClickOk && onClickOk(data);
  }

  handleClickCancel() {
    const { onClickCancel, data } = this.props;
    onClickCancel && onClickCancel(data);
  }

}

ConfirmModal.propTypes = {
  show: PropTypes.bool.isRequired,
  bodyText: PropTypes.node,
  okButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  onClickOk: PropTypes.func,
  onClickCancel: PropTypes.func,
  data: PropTypes.any
};

export default ConfirmModal;
