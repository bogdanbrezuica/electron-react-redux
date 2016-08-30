import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { articles } from './articleReducer';
import { fetchingArticles } from './fetchingReducer';

const rootReducer = combineReducers({
  articles,
  fetchingArticles,
  routing
});

export default rootReducer;
