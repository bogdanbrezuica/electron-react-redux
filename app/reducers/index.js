import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { articles } from './articleReducer';

const rootReducer = combineReducers({
  articles,
  routing
});

export default rootReducer;
