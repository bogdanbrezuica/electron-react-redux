import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';

const initialState = {
  articles: [
    {
      id: "0",
      name: "test",
      title: "test",
      content: "content",
      license: 1,
      image: {
        small: { width: 100, height: null, data: null },
        medium: { width: 150, height: null, data: null },
        large: { width: 200, height: null, data: null }
      }
    },
    {
      id: "1",
      name: "test2",
      title: "test2",
      content: "content2",
      license: 2,
      image: {
        small: { width: 100, height: null, data: null },
        medium: { width: 150, height: null, data: null },
        large: { width: 200, height: null, data: null }
      }
    }
  ]
}

const store = configureStore(initialState);
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
