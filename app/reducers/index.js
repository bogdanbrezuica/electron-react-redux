import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import article from './article';

const rootReducer = combineReducers({
  counter,
  article,
  routing
});

export default rootReducer;
