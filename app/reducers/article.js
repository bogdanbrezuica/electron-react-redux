import { SAVE_ARTICLE } from "../actions/article";

export default function article(state = null, action) {
	switch (action.type) {
		case SAVE_ARTICLE:
			return Object.assign({}, state, action.data); 
		default:
			return state;
	}
}
