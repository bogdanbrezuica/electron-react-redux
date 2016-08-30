import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import ArticleList from './containers/ArticleList';
import ArticleDetails from './containers/ArticleDetails';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={ArticleList} />
    <Route path="/article/:id" component={ArticleDetails} />
  </Route>
);
