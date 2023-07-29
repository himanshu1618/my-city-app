import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import ConfirmModal from '../../../components/ConfirmModal';
import RemoteTable from '../../../components/RemoteTable';
import dateUtil from '../../../utils/dateUtil';
import constants from '../../../constants';

import {
  fetchMyCitiesPaginated,
  deleteMyCity
} from '../myCityActions';

export class MyCitiesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
      showDeleteModal: false,
      myCityData: null
    };

    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleOnClickSearch = this.handleOnClickSearch.bind(this);
    this.actionCellFormatter = this.actionCellFormatter.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onClickEditItem = this.onClickEditItem.bind(this);
    this.onClickDeleteItem = this.onClickDeleteItem.bind(this);
  }

  componentDidMount() {
    this.fetchMyCitiesPaginated();
  }

  render() {
    const { myCities } = this.props;

    return (
      <div className='container my-cities-container'>
        {this.renderDateFilter()}
        <div className='my-cities-table'>
          <RemoteTable
            keyField='id'
            columns={this.getTableColumns()}
            data={myCities.paginated.data}
            page={myCities.paginated.page}
            sizePerPage={myCities.paginated.perPage}
            totalSize={myCities.paginated.totalSize}
            onTableChange={this.handleTableChange}
            bootstrap4
            bordered
          />
        </div>
        {this.renderDeleteConfirmModal()}
      </div>
    );
  }

  renderDateFilter() {
    const { startDate, endDate } = this.state;

    return (
      <Form>
        <Form.Row className='justify-content-end'>
          <Col xs='auto'>
            <Form.Label htmlFor='startDate' srOnly>
              <FormattedMessage id='mycity.prop.start_date' />
            </Form.Label>
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

          <Col xs='auto'>
            <Form.Label htmlFor='endDate' srOnly>
              <FormattedMessage id='mycity.prop.end_date' />
            </Form.Label>
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
          <Col xs='auto'>
            <FormattedMessage id='generic.actions.search'>
              {
                title => (
                  <Button
                    className='mb-2 search-icon'
                    title={title}
                    onClick={this.handleOnClickSearch}
                    tabIndex={0}
                  >
                    <FontAwesomeIcon icon='search' />
                  </Button>
                )
              }
            </FormattedMessage>
          </Col>
        </Form.Row>
      </Form>
    );
  }

  renderDeleteConfirmModal() {
    const { deleteMyCity } = this.props;
    const _this = this;

    if (!this.state.showDeleteModal) {
      return null;
    }

    return (
      <ConfirmModal
        show={this.state.showDeleteModal}
        bodyText='mycity.confirm_delete_msg'
        onClickOk={(row) => {
          _this.setState({
            showDeleteModal: false,
            myCityData: null
          });

          return deleteMyCity(row.id)
            .then(() => {
              return _this.fetchMyCitiesPaginated();
            });
        }}
        onClickCancel={() => {
          _this.setState({
            showDeleteModal: false,
            myCityData: null
          });
        }}
        data={this.state.myCityData}
      />
    );
  }

  getTableColumns() {
    return [{
      dataField: 'city',
      text: '',
      headerAlign: 'center',
      headerFormatter: () => <FormattedMessage id='mycity.prop.city' />,
      sort: false,
      formatter: this.cityCellFormatter
    }, {
      dataField: 'status',
      text: '',
      headerAlign: 'center',
      headerFormatter: () => <FormattedMessage id='mycity.prop.status' />,
      sort: false,
      formatter: this.statusCellFormatter
    }, {
      dataField: 'startDate',
      text: '',
      headerAlign: 'center',
      headerFormatter: (column, index, { sortElement }) => {
        const { order } = sortElement.props;
        return (
          <Fragment>
            <FormattedMessage id='mycity.prop.start_date' />
            {this.sortCaret(order)}
          </Fragment>
        );
      },
      sort: true,
      formatter: this.startDateCellFormatter
    }, {
      dataField: 'endDate',
      text: '',
      headerAlign: 'center',
      headerFormatter: (column, index, { sortElement }) => {
        const { order } = sortElement.props;
        return (
          <Fragment>
            <FormattedMessage id='mycity.prop.end_date' />
            {this.sortCaret(order)}
          </Fragment>
        );
      },
      sort: true,
      formatter: this.endDateCellFormatter
    }, {
      dataField: 'price',
      text: '',
      headerAlign: 'center',
      headerFormatter: (column, index, { sortElement }) => {
        const { order } = sortElement.props;
        return (
          <Fragment>
            <FormattedMessage id='mycity.prop.price' />
            {this.sortCaret(order)}
          </Fragment>
        );
      },
      sort: true
    }, {
      dataField: 'color',
      text: '',
      headerAlign: 'center',
      headerFormatter: (column, index, { sortElement }) => {
        const { order } = sortElement.props;
        return (
          <Fragment>
            <FormattedMessage id='mycity.prop.color' />
            {this.sortCaret(order)}
          </Fragment>
        );
      },
      sort: true,
      formatter: this.colorCellFormatter
    }, {
      dataField: 'actions',
      text: '',
      headerFormatter: () => <FormattedMessage id='generic.actions' />,
      sort: false,
      headerStyle: { width: '160px', textAlign: 'center' },
      formatter: this.actionCellFormatter
    }];
  }

  sortCaret(order) {
    if (!order) {
      return (<span className='order'><span className='dropdown'><span className='caret' /></span><span className='dropup'><span className='caret' /></span></span>);
    } else if (order === 'asc') {
      return (<span className='react-bootstrap-table-sort-order'><span className='caret' /></span>);
    } else if (order === 'desc') {
      return (<span className='react-bootstrap-table-sort-order dropup'><span className='caret' /></span>);
    }
    return null;
  }

  cityCellFormatter(cell, row) {
    return row.city && row.city.name;
  }

  statusCellFormatter(cell, row) {
    return row.status && row.status.name;
  }

  startDateCellFormatter(cell, row) {
    return dateUtil.formatDate(row.startDate, constants.dateFormat);
  }

  endDateCellFormatter(cell, row) {
    return dateUtil.formatDate(row.endDate, constants.dateFormat);
  }

  colorCellFormatter(cell, row) {
    return (
      <div className='color-cell'>
        <div style={{ display: 'inline-block', width: '14px', height: '14px', backgroundColor: row.color }} />
        &nbsp;
        <div style={{ display: 'inline-block' }}>{row.color}</div>
      </div>
    );
  }

  actionCellFormatter(cell, row) {
    return (
      <div className='actions'>
        <FormattedMessage id='generic.actions.edit'>
          {
            title => (
              <div className='action-icon edit-icon' title={title} onClick={() => this.onClickEditItem(row)} tabIndex={0}>
                <FontAwesomeIcon icon='pencil-alt' />
              </div>
            )
          }
        </FormattedMessage>
        <FormattedMessage id='generic.actions.delete'>
          {
            title => (
              <div className='action-icon delete-icon' title={title} onClick={() => this.onClickDeleteItem(row)} tabIndex={0}>
                <FontAwesomeIcon icon='trash-alt' />
              </div>
            )
          }
        </FormattedMessage>
      </div>
    );
  }

  handleTableChange(type, { page, sizePerPage, sortField, sortOrder }) {
    this.fetchMyCitiesPaginated(page, sizePerPage, sortField, sortOrder);
  }

  onClickEditItem(row) {
    this.props.history.push(`/mycities/${row.id}`);
  }

  onClickDeleteItem(row) {
    this.setState({
      showDeleteModal: true,
      myCityData: row
    });
  }

  handleChangeStartDate(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeEndDate(date) {
    this.setState({
      endDate: date
    });
  }

  handleOnClickSearch() {
    const { startDate, endDate } = this.state;
    if (startDate && endDate) {
      this.fetchMyCitiesPaginated();
    }
  }

  fetchMyCitiesPaginated(page, perPage, sortField, sortOrder) {
    const { myCities } = this.props;
    const { startDate, endDate } = this.state;
    page = page || myCities.paginated.page;
    perPage = perPage || myCities.paginated.perPage;
    const sort = ((sortField && sortOrder) && `${sortField} ${sortOrder.toLocaleUpperCase()}`) || myCities.paginated.sort;

    this.props.fetchMyCitiesPaginated(
      page - 1,
      perPage,
      sort,
      dateUtil.formatDate(startDate, constants.dateFormat),
      dateUtil.formatDate(endDate, constants.dateFormat)
    );
  }
}

MyCitiesContainer.propTypes = {
  history: PropTypes.object,
  myCities: PropTypes.object,
  fetchMyCitiesPaginated: PropTypes.func,
  deleteMyCity: PropTypes.func
};

export function mapStateToProps(state) {
  return {
    app: state.app,
    myCities: state.myCities
  };
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchMyCitiesPaginated: (page, perPage, sort, startDate, endDate) =>
      dispatch(fetchMyCitiesPaginated(page, perPage, sort, startDate, endDate)),
    deleteMyCity: (id) => dispatch(deleteMyCity(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCitiesContainer);
