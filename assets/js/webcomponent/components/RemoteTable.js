import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FormattedMessage } from 'react-intl';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

const paginationConfig = {
  sizePerPageList: [{
    text: '5', value: 5
  }, {
    text: '10', value: 10
  }],
  hideSizePerPage: true,
  hidePageListOnlyOnePage: true,
  pageStartIndex: 1,
  showTotal: false
};

const RemoteTable = (props) => {
  const { page, sizePerPage, totalSize } = props;

  return (
    <BootstrapTable
      remote
      noDataIndication={() => (<div><FormattedMessage id='table.no_data' /></div>)}
      pagination={paginationFactory({ ...paginationConfig, page, sizePerPage, totalSize })}
      {...props}
    />
  );
};

RemoteTable.propTypes = {
  page: PropTypes.number,
  sizePerPage: PropTypes.number,
  totalSize: PropTypes.number
};

export default RemoteTable;
