import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import { getAllArticles } from "./api/db";
import { allArticles } from "./actions/articleActions";
import { fetchArticles } from "./actions/fetchingActions";
import './app.global.css';

const store = configureStore();

store.dispatch(fetchArticles());
getAllArticles().then((articles) => {
  store.dispatch(allArticles(articles));
});

const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
