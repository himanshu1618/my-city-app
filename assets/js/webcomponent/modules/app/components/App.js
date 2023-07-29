import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { hot } from 'react-hot-loader/root';

import {
  fetchTranslation,
  fetchCities,
  fetchStatuses
} from '../appActions';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Routes from '../../../routes/Routes';

class App extends Component {
  componentDidMount() {
    const { app, fetchTranslation, fetchCities, fetchStatuses } = this.props;
    fetchTranslation(app.locale);
    fetchCities();
    fetchStatuses();
  }

  render() {
    const { app, user } = this.props;
    const tranlation = app.translations[app.locale];

    if (isEmpty(tranlation)) {
      return <div />;
    }

    return (
      <IntlProvider locale={app.locale} messages={tranlation} >
        <Header user={user.data} />
        <Routes />
        <Footer />
      </IntlProvider>
    );
  }
}

App.propTypes = {
  app: PropTypes.object,
  user: PropTypes.object,
  fetchTranslation: PropTypes.func,
  fetchCities: PropTypes.func,
  fetchStatuses: PropTypes.func
};

function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTranslation: (locale) => dispatch(fetchTranslation(locale)),
    fetchCities: () => dispatch(fetchCities()),
    fetchStatuses: () => dispatch(fetchStatuses())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(App));
