import ActionType from "../constants/ActionType";

export function fetchingArticles(state = false, action) {
	switch(action.type) {
		case ActionType.FETCH_ARTICLES:
			return true;
		case ActionType.ALL_ARTICLES:
			return false;
		default:
			return state;
	}
}