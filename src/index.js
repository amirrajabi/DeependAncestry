/**
 * Created by Amir on 26/09/2016.
 */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import './styles/styles.scss';
import {syncHistoryWithStore} from 'react-router-redux';

require('./favicon.ico');

const store = configureStore(),
  history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>, document.getElementById('app')
);
