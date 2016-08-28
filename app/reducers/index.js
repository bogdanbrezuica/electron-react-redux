import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import { articles } from './article';

const rootReducer = combineReducers({
  counter,
  articles,
  routing
});

export default rootReducer;
