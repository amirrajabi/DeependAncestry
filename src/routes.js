/**
 * Created by Amir on 26/09/2016.
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import AdvanceSearch from './components/AdvanceSearch';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="advance-search" component={AdvanceSearch}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
