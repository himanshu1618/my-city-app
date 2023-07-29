import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { SketchPicker } from 'react-color';

import 'react-datepicker/dist/react-datepicker.css';

import AlertBox from '../../../components/AlertBox';
import ConfirmModal from '../../../components/ConfirmModal';
import constants from '../../../constants';

import {
  fetchMyCity,
  updateMyCity
} from '../myCityActions';

export class EditMyCityContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: null,
      status: null,
      startDate: null,
      endDate: null,
      price: '',
      color: '',
      showSaveModal: false,
      myCityData: null
    };

    this.handleSelectCity = this.handleSelectCity.bind(this);
    this.handleSelectStatus = this.handleSelectStatus.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
  }

  componentDidMount() {
    this.fetchMyCity();
  }

  render() {
    const { mycity, app } = this.props;
    let { startDate, endDate } = this.state;
    startDate = startDate || (mycity.data.startDate ? new Date(mycity.data.startDate) : null);
    endDate = endDate || (mycity.data.endDate ? new Date(mycity.data.endDate) : null);

    return (
      <div className='container my-cities-container'>
        <div className='validation-msg'>
          {
            this.getValidationErrMsg()
          }
        </div>

        <Form>
          {this.renderCity(mycity, app)}
          {this.renderStatus(mycity, app)}
          {this.renderStartDate(startDate, endDate)}
          {this.renderEndDate(startDate, endDate)}
          {this.renderPrice(mycity)}
          {this.renderColor(mycity)}

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <FormattedMessage id='generic.actions.save'>
                {
                  title => (
                    <Button
                      className='mb-2'
                      title={title}
                      onClick={this.handleClickSave}
                      tabIndex={0}
                    >
                      {title}
                    </Button>
                  )
                }
              </FormattedMessage>
            </Col>
          </Form.Group>
        </Form>
        {this.renderSaveConfirmModal()}
      </div>
    );
  }

  getValidationErrMsg() {
    const { mycity } = this.props;
    const err = mycity.errMsg
      ? mycity.errMsg
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

  renderCity(mycity, app) {
    const { city } = this.state;
    const selectedCity = {
      value: city ? city.value : get(mycity, 'data.city.id'),
      label: city ? city.label : get(mycity, 'data.city.name')
    };

    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2} htmlFor='city'>
          <FormattedMessage id='mycity.prop.city' />
        </Form.Label>
        <Col md={4} sm={6} xs={10}>
          <Select
            id='city'
            value={selectedCity}
            options={app.cities}
            isSearchable
            isMulti={false}
            onChange={this.handleSelectCity}
          />
        </Col>
      </Form.Group>
    );
  }

  renderStatus(mycity, app) {
    const { status } = this.state;
    const selectedStatus = {
      value: status ? status.value : get(mycity, 'data.status.id'),
      label: status ? status.label : get(mycity, 'data.status.name')
    };

    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2} htmlFor='status'>
          <FormattedMessage id='mycity.prop.status' />
        </Form.Label>
        <Col md={4} sm={6} xs={10}>
          <Select
            id='status'
            value={selectedStatus}
            options={app.statuses}
            isSearchable
            isMulti={false}
            onChange={this.handleSelectStatus}
          />
        </Col>
      </Form.Group>
    );
  }

  renderStartDate(startDate, endDate) {
    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2} htmlFor='startDate'>
          <FormattedMessage id='mycity.prop.start_date' />
        </Form.Label>
        <Col xs='auto'>
          <DatePicker
            id='startDate'
            className='mb-2 form-control'
            placeholderText='Select a start date'
            showTimeSelect={false}
            showMonthDropdown
            useShortMonthInDropdown
            showYearDropdown
            isClearable
            dateFormat={constants.dateFormatPicker}
            selected={startDate || null}
            maxDate={endDate || null}
            onChange={this.handleChangeStartDate}
          />
        </Col>
      </Form.Group>
    );
  }

  renderEndDate(startDate, endDate) {
    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2} htmlFor='endDate'>
          <FormattedMessage id='mycity.prop.end_date' />
        </Form.Label>
        <Col xs='auto'>
          <DatePicker
            id='endDate'
            className='mb-2 form-control'
            placeholderText='Select a end date'
            showTimeSelect={false}
            showMonthDropdown
            useShortMonthInDropdown
            showYearDropdown
            isClearable
            dateFormat={constants.dateFormatPicker}
            selected={endDate || null}
            minDate={startDate || null}
            onChange={this.handleChangeEndDate}
          />
        </Col>
      </Form.Group>
    );
  }

  renderPrice(mycity) {
    let { price } = this.state;
    price = price || (mycity.data.price || '');

    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2} htmlFor='price'>
          <FormattedMessage id='mycity.prop.price' />
        </Form.Label>
        <Col xs='auto'>
          <Form.Control
            id='price'
            type='text'
            value={price}
            isInvalid={mycity.errors.price}
            onChange={this.handleChangePrice}
          />
        </Col>
        <Form.Control.Feedback type='invalid'>
          {
            mycity.errors.price && (
              <FormattedMessage id={mycity.errors.price} defaultMessage='Required' />
            )
          }
        </Form.Control.Feedback>
      </Form.Group>
    );
  }

  renderColor(mycity) {
    let { color } = this.state;
    color = color || (mycity.data.color || '');

    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2} htmlFor='color'>
          <FormattedMessage id='mycity.prop.color' />
        </Form.Label>
        <Col xs='auto'>
          <SketchPicker
            id='color'
            color={color}
            onChangeComplete={this.handleChangeColor}
          />
        </Col>
      </Form.Group>
    );
  }

  renderSaveConfirmModal() {
    const { updateMyCity, history, match } = this.props;
    const id = get(match, 'params.id');
    const _this = this;

    if (!this.state.showSaveModal) {
      return null;
    }

    return (
      <ConfirmModal
        show={this.state.showSaveModal}
        bodyText='mycity.confirm_save_msg'
        onClickOk={(row) => {
          _this.setState({
            showSaveModal: false,
            myCityData: null
          });

          return updateMyCity(id, row)
            .then(() => {
              return history.push('/mycities');
            });
        }}
        onClickCancel={() => {
          _this.setState({
            showSaveModal: false,
            myCityData: null
          });
        }}
        data={this.state.myCityData}
      />
    );
  }

  handleSelectCity(value) {
    this.setState({ city: value });
  }

  handleSelectStatus(value) {
    this.setState({ status: value });
  }

  handleChangeStartDate(date) {
    this.setState({ startDate: date });
  }

  handleChangeEndDate(date) {
    this.setState({ endDate: date });
  }

  handleChangePrice(e) {
    this.setState({ price: e.target.value });
  }

  handleChangeColor(color) {
    this.setState({ color: color.hex });
  }

  handleClickSave() {
    const { match } = this.props;
    const id = get(match, 'params.id');
    if (id) {
      const { city,  status, startDate, endDate, price, color } = this.state;
      const data = {
        city: city && city.value,
        status: status && status.value,
        startDate,
        endDate,
        price,
        color
      };
      this.setState({ showSaveModal: true, myCityData: data });
    }
  }

  fetchMyCity(id) {
    const { match } = this.props;
    id = id || get(match, 'params.id');

    if (id) {
      this.props.fetchMyCity(id);
    }
  }
}

EditMyCityContainer.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  app: PropTypes.object,
  mycity: PropTypes.object,
  fetchMyCity: PropTypes.func,
  updateMyCity: PropTypes.func
};

export function mapStateToProps(state) {
  return {
    app: state.app,
    mycity: state.myCities.mycity
  };
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchMyCity: (id) => dispatch(fetchMyCity(id)),
    updateMyCity: (id, data) => dispatch(updateMyCity(id, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMyCityContainer);
