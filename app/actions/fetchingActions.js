import ActionType from '../constants/ActionType';

export default function fetchArticles() {
	return {
		type: ActionType.FETCH_ARTICLES
	};
}
