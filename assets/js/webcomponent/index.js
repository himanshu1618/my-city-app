import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faPencilAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

import '../../styles/styles.scss';

import configureStore, { history } from './store/configureStore';
import App from './modules/app/components/App';

library.add([faTrashAlt, faPencilAlt, faSearch]);
require('../../images/favicon.ico');

const store = configureStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./modules/app/components/App', () => {
    const { AppContainer } = require('react-hot-loader');
    const NewApp = require('./modules/app/components/App').default;

    render(
      <Provider store={store}>
        <AppContainer>
          <ConnectedRouter history={history}>
            <NewApp store={store} history={history} />
          </ConnectedRouter>
        </AppContainer>
      </Provider>,
      document.getElementById('app')
    );
  });
}
