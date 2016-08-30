import ActionType from "../constants/ActionType";

export function fetchArticles() {
	return {
		type: ActionType.FETCH_ARTICLES
	};
}